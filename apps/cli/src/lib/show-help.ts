import boxen from "boxen";
import chalk from "chalk";

import { CLI_NAME, VERSION } from "../config/constant.js";
import { banner } from "../ui/banner.js";
import { log } from "./logger.js";

function buildHelpText(): string {
  const sections = [
    {
      title: "Usage",
      lines: [
        `${chalk.cyan(CLI_NAME)} ${chalk.green("add")} <template> <project-name>`,
      ],
    },
    {
      title: "Examples",
      lines: [
        `${CLI_NAME} add react-basic my-app`,
        `${CLI_NAME} add next-saas-pro my-app`,
      ],
    },
    {
      title: "Options",
      lines: [
        `${chalk.yellow("-h, --help")}        Show help information`,
        `${chalk.yellow("-v, --version")}     Show CLI version`,
      ],
    },
  ];

  return sections
    .map((section) => {
      const title = chalk.bold(section.title);
      const lines = section.lines.map((line) => `  ${line}`).join("\n");
      return `${title}\n${lines}`;
    })
    .join("\n\n");
}

export function showHelp(): void {
  log.blank();

  banner("DevKit", "https://devkit.sh");

  const text = buildHelpText();

  const box = boxen(text, {
    title: chalk.bold("Help"),
    padding: { top: 1, bottom: 1, left: 2, right: 2 },
    margin: 1,
    borderStyle: "round",
    borderColor: "yellow",
  });

  console.log(box);

  // subtle footer
  console.log(
    chalk.gray(`\nRun ${CLI_NAME} <command> --help for more details.`)
  );
}

export function showVersion(): void {
  log.info(`${CLI_NAME} v${VERSION}`);
}
