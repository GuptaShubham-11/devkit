#!/usr/bin/env node

(async () => {
  try {
    await import("../dist/index.js");
  } catch (err) {
    try {
      const { log } = await import("../dist/lib/logger.js");

      log.blank();
      log.error("Debkit failed to start!");

      if (err instanceof Error) {
        log.option(err.message);
      }

      log.blank();
      log.step("Report this issue:");
      log.option("https://github.com/GuptaShubham-11/devkit/issues");
      log.blank();
    } catch {
      console.error("\n❌ Debkit failed to start.\n");

      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }

      console.error(
        "\nReport this issue:\nhttps://github.com/GuptaShubham-11/devkit/issues\n"
      );
    }

    process.exit(1);
  }
})();
