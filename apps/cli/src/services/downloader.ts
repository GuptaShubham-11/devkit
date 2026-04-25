import chalk from "chalk";
import cliProgress from "cli-progress";
import fs from "fs/promises";
import path from "path";

import { LIMITS } from "../config/constant.js";
import { formatSize } from "../lib/format-size.js";
import { http } from "../lib/http.js";
import { log } from "../lib/logger.js";
import { resolveSafePath } from "../lib/safe-path.js";
import { fail, spin, succeed } from "../lib/spinner.js";
import { fetchFiles, RemoteFile } from "./fetch-files.js";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function downloadFile(file: RemoteFile, destination: string) {
  for (let attempt = 0; attempt <= LIMITS.maxRetries; attempt++) {
    try {
      const res = await http.get(file.url, {
        responseType: "stream",
      });

      await fs.mkdir(path.dirname(destination), { recursive: true });

      const writer = await fs.open(destination, "w");

      await new Promise<void>((resolve, reject) => {
        const stream = writer.createWriteStream();

        res.data.on("error", reject);
        stream.on("error", reject);
        stream.on("finish", resolve);

        res.data.pipe(stream);
      });

      await writer.close();
      return;
    } catch (err) {
      if (attempt === LIMITS.maxRetries) {
        throw new Error(`Failed to download: ${file.path}`);
      }

      // exponential backoff
      await sleep(500 * (attempt + 1));
    }
  }
}

export async function downloadTemplate(
  templateId: string,
  token: string | undefined,
  userId: string | undefined,
  projectName: string
) {
  const projectPath =
    projectName === "."
      ? process.cwd()
      : path.resolve(process.cwd(), projectName);

  await fs.mkdir(projectPath, { recursive: true });

  log.divider();

  const spinner = spin("Fetching template files...");

  let files: RemoteFile[];

  try {
    files = await fetchFiles(templateId, token, userId);
  } catch (err) {
    fail(spinner, `Failed to fetch template files: (${err})`);
    process.exit(1);
  }

  succeed(spinner, "Files fetched successfully");
  log.divider();

  const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);

  log.option(`Total size: ${chalk.bold.white(formatSize(totalSize))}`);
  log.option(`Total files: ${files.length}`);

  log.blank();
  log.step("Downloading:");

  const totalKB = Math.ceil(totalSize / 1024);

  const bar = new cliProgress.SingleBar(
    {
      format: `   [${chalk.hex("#6366f1")("{bar}")}] {percentage}% | {value}/{total}`,
      barCompleteChar: "█",
      barIncompleteChar: "░",
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic
  );

  bar.start(totalKB, 0);

  let downloadedBytes = 0;

  //  queue-based worker (safe concurrency)
  const queue = [...files];

  async function worker() {
    while (queue.length > 0) {
      const file = queue.shift();
      if (!file) return;

      const localPath = resolveSafePath(projectPath, file.path);

      await downloadFile(file, localPath);

      downloadedBytes += file.size || 0;
      bar.update(Math.ceil(downloadedBytes / 1024));
    }
  }

  const workers = Array.from({ length: LIMITS.maxConcurrentDownloads }, () =>
    worker()
  );

  const startTime = Date.now();

  try {
    await Promise.all(workers);
  } catch (err) {
    bar.stop();
    log.error("Download failed!");
    throw err;
  }

  bar.stop();

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  log.blank();
  console.log(chalk.hex("#16a34a").bold(`Completed in ${duration}s`));
}
