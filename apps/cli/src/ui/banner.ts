import chalk from "chalk";
import figlet from "figlet";

const isTTY = process.stdout.isTTY;

export function banner(name: string, url?: string) {
  if (!isTTY) return;

  const width = process.stdout.columns || 80;

  let ascii: string;

  try {
    ascii = figlet.textSync(name, {
      font: "ANSI Shadow",
      horizontalLayout: "default",
    });
  } catch {
    // fallback if figlet fails
    ascii = name;
  }

  const centered = ascii
    .split("\n")
    .map((line) => {
      const trimmed = line.trimEnd();
      const pad = Math.max(0, Math.floor((width - trimmed.length) / 2));
      return " ".repeat(pad) + trimmed;
    })
    .join("\n");

  console.log();

  console.log(chalk.hex("#6366f1").bold(centered));

  if (url) {
    const pad = Math.max(0, Math.floor((width - url.length) / 2));
    console.log(" ".repeat(pad) + chalk.gray(url));
  }

  console.log();
}
