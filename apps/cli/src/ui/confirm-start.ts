import chalk from "chalk";
import prompts from "prompts";

import { log } from "../lib/logger.js";

export async function confirmStart(creditCost: number) {
  if (!process.stdout.isTTY) {
    throw new Error("Interactive confirmation is required for this operation.");
  }

  log.blank();
  log.divider();

  log.info(chalk.bold("Before you continue:"));
  log.divider();

  log.step("Ensure you have a stable internet connection");
  log.step("Keep this terminal open during the setup process");
  log.step(
    `This action will consume ${chalk.bold(
      `${creditCost} credits`
    )} and cannot be undone once started`
  );

  log.blank();
  log.divider();

  const response = await prompts(
    {
      type: "confirm",
      name: "continue",
      message: "Do you want to proceed?",
      initial: true,
    },
    {
      onCancel: () => {
        throw new Error("Authentication cancelled!");
      },
    }
  );

  if (!response.continue) {
    throw new Error("Operation cancelled!");
  }
}
