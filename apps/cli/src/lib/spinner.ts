import ora, { Ora } from "ora";

import { log } from "./logger.js";

const isTTY = process.stdout.isTTY;

export type Spinner = Ora | null;

//  create spinner
export function spin(text: string): Spinner {
  if (!isTTY) {
    log.step(text);
    return null;
  }

  return ora({
    text,
    spinner: "dots",
  }).start();
}

//  update text
export function update(spinner: Spinner, text: string) {
  if (spinner) {
    spinner.text = text;
  }
}

// success
export function succeed(spinner: Spinner, message: string) {
  if (!spinner) {
    log.success(message);
    return;
  }

  spinner.succeed(message);
}

//  fail
export function fail(spinner: Spinner, message: string) {
  if (!spinner) {
    log.error(message);
    return;
  }

  spinner.fail(message);
}

//  warn
export function warn(spinner: Spinner, message: string) {
  if (!spinner) {
    log.warn(message);
    return;
  }

  spinner.warn(message);
}

// stop safely
export function stop(spinner: Spinner) {
  spinner?.stop();
}
