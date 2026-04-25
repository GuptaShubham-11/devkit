import boxen from "boxen";
import chalk from "chalk";
import prompts from "prompts";

import { emailPattern } from "@repo/shared";

import { URLS } from "../config/constant.js";
import { log } from "../lib/logger.js";
import { fail, spin, succeed } from "../lib/spinner.js";
import { verifyAccess } from "./verify-access.js";

export interface ProAccessResponse {
  allowed: boolean;
  token?: string;
  message?: string;
  error?: string;
  status?: number;
  userId?: string;
}

export type ProResult = {
  shortLivedToken?: string;
  userId?: string;
};

async function promptCredentials() {
  const response = await prompts(
    [
      {
        type: "text",
        name: "email",
        message: "Email:",
        validate: (value: string) => {
          const email = value.trim();
          if (!email) return "Email is required!";
          if (!emailPattern.test(email)) return "Enter a valid email address!";
          return true;
        },
      },
      {
        type: "password",
        name: "privateKey",
        message: "Secret:",
        validate: (value: string) => {
          if (value.length !== 11) return "Secret must be 11 characters!";
          return true;
        },
      },
    ],
    {
      onCancel: () => {
        throw new Error("Authentication cancelled!");
      },
    }
  );

  return response;
}

//  upgrade message
function showUpgradeMessage(error?: string) {
  log.divider();
  log.warn("This template requires a Pro plan.");

  if (error) {
    log.option(error);
  }

  log.blank();

  const box = boxen(
    `${chalk.bold("Upgrade your plan")}\n${chalk.dim(URLS.pricing)}`,
    {
      padding: { top: 0, bottom: 0, left: 2, right: 1 },
      borderStyle: "round",
      borderColor: "green",
    }
  );

  console.log(box);
  log.blank();
}

//  main auth handler
export async function handleAuth(templateId: string): Promise<ProResult> {
  if (!process.stdout.isTTY) {
    throw new Error("Interactive authentication is required.");
  }

  log.divider();
  log.info("Sign in to continue:");
  log.divider();

  const { email, privateKey } = await promptCredentials();
  const spinner = spin("Verifying access...");
  const response: ProAccessResponse = await verifyAccess(
    email,
    privateKey,
    templateId
  );

  log.blank();
  log.divider();

  if (!response.allowed || !response.token || response.error) {
    fail(spinner, `Access denied: (${response.error})`);
    log.divider();
    if (response.status === 402) showUpgradeMessage(response.error);
    process.exit(1);
  }

  succeed(spinner, "Access granted");

  return {
    shortLivedToken: response.token,
    userId: response.userId,
  };
}
