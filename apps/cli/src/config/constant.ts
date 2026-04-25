export const CLI_NAME = "devkit";
export const VERSION = "0.0.1";

export const URLS = {
  support: "https://devkit.sh",
  pricing: "https://devkit.sh/pricing",
  backend: "https://devkit.sh/api",
  local: "http://localhost:3000/api",
} as const;

export const RUNTIME = {
  env: process.env.NODE_ENV ?? "development",
  isDev: process.env.NODE_ENV !== "production",
} as const;

export const LIMITS = {
  maxConcurrentDownloads: 5,
  maxRetries: 3,
  previewLimit: 8,
} as const;

export const IGNORE_FILES = [
  ".DS_Store",
  "Thumbs.db",
  ".git",
  ".gitignore",
  ".idea",
  ".vscode",
  "node_modules",
];
