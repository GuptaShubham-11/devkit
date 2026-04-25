import boxen from "boxen";
import chalk from "chalk";

import { Template } from "@repo/shared";

import { log } from "../lib/logger.js";

export function showTemplateInfo(data: Template) {
  if (!data) return;

  const lines = [
    `${chalk.bold("Template")}      ${chalk.cyan(data.name)}`,
    `${chalk.bold("Description")}   ${chalk.gray(data.description || "—")}`,
    `${chalk.bold("Stack")}         ${formatStack(data.stack)}`,
    `${chalk.bold("Version")}       ${chalk.yellow(data.version)}`,
    `${chalk.bold("Downloads")}     ${formatNumber(data.downloads)}`,
    `${chalk.bold("Cost")}          ${formatCost(data.creditCost)}`,
  ];

  const box = boxen(lines.join("\n"), {
    title: chalk.bold("Template Details"),
    padding: { top: 1, bottom: 1, left: 2, right: 2 },
    margin: 1,
    borderStyle: "round",
    borderColor: "gray",
  });

  console.log(box);
}

function formatStack(stack?: string[]) {
  if (!stack || stack.length === 0) return "—";
  return stack.map((s) => chalk.green(s)).join(", ");
}

function formatNumber(num?: number) {
  if (!num && num !== 0) return "—";
  return num.toLocaleString();
}

function formatCost(cost?: number) {
  if (!cost) return chalk.gray("Free");
  return chalk.magenta(`${cost} credits`);
}
