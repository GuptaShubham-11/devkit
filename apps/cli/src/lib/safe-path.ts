import path from "path";

export function resolveSafePath(base: string, target: string): string {
  if (!base || !target) {
    throw new Error("Base path and target path are required.");
  }

  const resolvedBase = path.resolve(base);
  const resolvedTarget = path.resolve(resolvedBase, target);

  const relative = path.relative(resolvedBase, resolvedTarget);

  // Security check
  if (
    relative.startsWith("..") || // outside base
    path.isAbsolute(relative) // absolute path trick
  ) {
    throw new Error(`Unsafe file path detected: ${target}`);
  }

  return resolvedTarget;
}
