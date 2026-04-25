export function formatSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB"] as const;

  let i = 0;
  let size = bytes;

  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }

  //  formatting rules
  if (i === 0) {
    return `${size} ${units[i]}`; // B
  }

  if (size >= 10) {
    return `${Math.round(size)} ${units[i]}`; // 10+ → no decimals
  }

  return `${size.toFixed(1)} ${units[i]}`; // small → 1 decimal
}
