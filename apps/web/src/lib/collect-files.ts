import type { File, Item } from "@repo/shared";

import { http } from "./http";
import { serverEnv } from "./server-env";

// Retry helper
async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    return withRetry(fn, retries - 1);
  }
}

//  Simple concurrency limiter (no dependency)
function createLimiter(limit: number) {
  let active = 0;
  const queue: (() => void)[] = [];

  const next = () => {
    if (queue.length && active < limit) {
      active++;
      const resolve = queue.shift()!;
      resolve();
    }
  };

  return async <T>(fn: () => Promise<T>): Promise<T> => {
    if (active >= limit) {
      await new Promise<void>((res) => queue.push(res));
    } else {
      active++;
    }

    try {
      return await fn();
    } finally {
      active--;
      next();
    }
  };
}

export async function collectFiles(apiUrl: string): Promise<File[]> {
  const list: File[] = [];
  const limit = createLimiter(5); // Safe Concurrency
  let rootPath: string | undefined;

  async function traverse(url: string): Promise<void> {
    const GITHUB_HEADERS = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${serverEnv.GITHUB_SECRET_TOKEN}`,
    };

    const res: { status: number; data: Item[] } = await withRetry(() =>
      http.get(url, {
        headers: GITHUB_HEADERS,
        timeout: 15000,
      })
    );

    if (res.status !== 200 || !Array.isArray(res.data)) {
      throw new Error(`GitHub fetch failed (${res.status}) at ${url}`);
    }

    const items: Item[] = res.data;

    // Set root path once
    if (!rootPath && items.length > 0) {
      const parts = items[0].path.split("/");
      parts.pop();
      rootPath = parts.join("/") + "/";
    }

    const tasks: Promise<void>[] = [];

    for (const item of items) {
      if (item.type === "file" && item.download_url) {
        const relativePath =
          rootPath && item.path.startsWith(rootPath)
            ? item.path.slice(rootPath.length)
            : item.path;

        list.push({
          path: relativePath,
          url: item.download_url,
          size: item.size || 0,
        });
      }

      if (item.type === "dir") {
        // Controlled parallel recursion
        tasks.push(limit(() => traverse(item.url)));
      }
    }

    await Promise.all(tasks);
  }

  await traverse(apiUrl);

  return list;
}
