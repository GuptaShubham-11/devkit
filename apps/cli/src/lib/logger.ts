import chalk from "chalk";

const isTTY = process.stdout.isTTY;

const icons = {
  success: "✔ ",
  error: "✖ ",
  warn: "⚠ ",
  info: "ℹ ",
  step: "➜ ",
} as const;

const color = {
  brand: chalk.hex("#6366f1"),
  success: chalk.hex("#16a34a"),
  warn: chalk.hex("#f59e0b"),
  error: chalk.hex("#f05252"),
  muted: chalk.hex("#888888"),
  info: chalk.hex("#1f6ae2"),
  accent: chalk.hex("#ff007f"),
} as const;

function write(message = ""): void {
  if (!isTTY) {
    console.log(stripAnsi(message));
    return;
  }
  console.log(message);
}

function stripAnsi(str: string) {
  return str.replace(/\x1B\[[0-9;]*m/g, "");
}

function format(icon: string, msg: string, colorFn: (txt: string) => string) {
  return `${colorFn(icon)} ${msg}`;
}

function divider(size = 70) {
  const width = process.stdout.columns
    ? Math.min(process.stdout.columns, size)
    : 60;

  write(color.muted("─".repeat(width)));
}

export const log = {
  blank() {
    write();
  },

  divider,

  title(msg: string) {
    write("\n" + chalk.bold(color.brand(msg)));
  },

  section(msg: string) {
    write("\n" + color.brand(msg));
  },

  success(msg: string) {
    write(format(icons.success, msg, color.success));
  },

  error(msg: string) {
    write(format(icons.error, msg, color.error));
  },

  warn(msg: string) {
    write(format(icons.warn, msg, color.warn));
  },

  info(msg: string) {
    write(format(icons.info, msg, color.info));
  },

  step(msg: string) {
    write(format(icons.step, msg, color.accent));
  },

  option(msg: string) {
    write(`   ${color.muted(msg)}`);
  },

  muted(msg: string) {
    write(color.muted(msg));
  },

  debug(msg: string) {
    if (process.env.DEVKIT_DEBUG) {
      write(color.muted(`[debug] ${msg}`));
    }
  },
};
