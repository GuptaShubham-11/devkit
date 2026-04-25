#!/usr/bin/env node

import { slugSchema } from "@repo/shared";

import { createProject } from "./commands/create.js";
import { CLI_NAME, URLS } from "./config/constant.js";
import { log } from "./lib/logger.js";
import { showHelp, showVersion } from "./lib/show-help.js";

async function main() {
  try {
    const args = process.argv.slice(2);

    if (args.length === 0) {
      return showNoArgs();
    }

    // global flags
    if (args.includes("--help") || args.includes("-h")) {
      return showHelp();
    }

    if (args.includes("--version") || args.includes("-v")) {
      return showVersion();
    }

    const [command, ...rest] = args;

    switch (command) {
      case "add":
      case "create":
        return handleCreate(rest);

      default:
        return showUsageError(
          `Unknown command: ${command}`,
          `${CLI_NAME} add react-basic my-app`
        );
    }
  } catch (error) {
    handleFatalError(error);
  }
}

async function handleCreate(args: string[]) {
  const [templateSlug, projectName] = args;

  if (!templateSlug) {
    return showUsageError(
      "Template slug is required!",
      `${CLI_NAME} add react-basic my-app`
    );
  }

  if (!projectName) {
    return showUsageError(
      "Project name is required!",
      `${CLI_NAME} add react-basic my-app`
    );
  }

  const validSlugFormat = slugSchema.safeParse(templateSlug);
  if (!validSlugFormat.success) {
    return showUsageError(
      "Invalid template slug format!",
      `${CLI_NAME} add react-basic my-app`
    );
  }

  log.title(" ▲ Devkit");
  log.option("https://devkit.sh");
  log.divider();

  log.blank();
  log.step(
    `Project: ${projectName === "." ? "Current directory" : projectName}`
  );
  log.step(`Template: ${templateSlug}`);

  await createProject(templateSlug, projectName);
}

function showNoArgs() {
  log.blank();
  log.warn("No arguments provided.");
  log.option("Use --help to see available commands.");
  log.blank();
}

function showUsageError(message: string, example?: string) {
  log.blank();
  log.error(message);

  if (example) {
    log.blank();
    log.step("Example:");
    log.option(example);
  }

  log.blank();
}

function handleFatalError(error: unknown) {
  log.blank();

  if (error instanceof Error) {
    log.error(error.message);
  } else {
    log.error("Unexpected error occurred.");
  }

  log.blank();
  log.option("If this issue persists, report it:");
  log.option(URLS.support);

  log.blank();

  process.exit(1);
}

process.on("unhandledRejection", handleFatalError);
process.on("uncaughtException", handleFatalError);

main();
