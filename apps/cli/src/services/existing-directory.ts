import chalk from "chalk";
import fs from "fs/promises";
import path from "path";

import { IGNORE_FILES } from "../config/constant.js";
import { log } from "../lib/logger.js";
import {
  OverwriteMode,
  promptOverwriteMode,
} from "../ui/prompt-overwrite-mode.js";
import { showDirectoryPreview } from "../ui/show-directory-preview.js";

export async function handleExistingDirectory(
  projectPath: string,
  projectName: string
): Promise<OverwriteMode> {
  const resolvedPath = path.resolve(projectPath);
  const isCurrentDir = projectName === ".";

  const exists = await pathExists(resolvedPath);
  if (!exists) return "replace";

  const stats = await fs.stat(resolvedPath);

  if (!stats.isDirectory()) {
    throw new Error(
      `"${chalk.bold(projectName)}" already exists and is not a directory!`
    );
  }

  if (!isCurrentDir) {
    throw new Error(`Directory "${chalk.bold(projectName)}" already exists.`);
  }

  const files = await fs.readdir(resolvedPath);
  if (!files.length) return "replace";

  const visibleFiles = files.filter((f) => !IGNORE_FILES.includes(f));
  if (!visibleFiles.length) return "replace";

  if (!process.stdout.isTTY) {
    log.warn("Directory is not empty. Continuing in non-interactive mode.");
    return "replace";
  }

  showDirectoryPreview(resolvedPath, visibleFiles);

  return promptOverwriteMode();
}

async function pathExists(pathname: string) {
  try {
    await fs.access(pathname);
    return true;
  } catch {
    return false;
  }
}
