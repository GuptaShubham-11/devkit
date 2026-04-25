import chalk from "chalk";

const isTTY = process.stdout.isTTY;

export function nextSteps(steps: string[]) {
  if (!steps || steps.length === 0) return;

  console.log();
  console.log(chalk.bold("Next steps:"));
  console.log();

  steps.forEach((step, index) => {
    const prefix = `${index + 1}.`;

    if (!isTTY) {
      console.log(`  ${prefix} ${step}`);
      return;
    }

    console.log(`  ${chalk.cyan(prefix)} ${chalk.white(step)}`);
  });

  console.log();
}
