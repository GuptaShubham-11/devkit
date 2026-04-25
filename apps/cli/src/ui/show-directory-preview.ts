import path from "path";

import { LIMITS } from "../config/constant.js";
import { log } from "../lib/logger.js";

export function showDirectoryPreview(directory: string, files: string[]) {
  if (!files || files.length === 0) return;

  const relative = path.relative(process.cwd(), directory) || ".";

  log.blank();

  log.warn("The target directory is not empty.");
  log.option(`Location: ${relative === "." ? "current directory" : relative}`);

  log.divider();

  log.step("Detected files:");

  const previewFiles = files.slice(0, LIMITS.previewLimit);

  previewFiles.forEach((file) => {
    const isDir = file.endsWith("/");
    const formatted = isDir ? `${file}` : file;

    log.option(formatted);
  });

  if (files.length > LIMITS.previewLimit) {
    log.option(`...and ${files.length - LIMITS.previewLimit} more items`);
  }

  log.blank();
  log.divider();
}
