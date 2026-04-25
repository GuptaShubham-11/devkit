import chalk from "chalk";
import path from "path";

import type { Template } from "@repo/shared";

import { errorMessage } from "../lib/error-message.js";
import { log } from "../lib/logger.js";
import { fail, spin, stop, succeed } from "../lib/spinner.js";
import { sendAnalytics } from "../services/analytics.js";
import { handleAuth, ProResult } from "../services/auth.js";
import { downloadTemplate } from "../services/downloader.js";
import { handleExistingDirectory } from "../services/existing-directory.js";
import { fetchTemplate } from "../services/fetch-template.js";
import { confirmStart } from "../ui/confirm-start.js";
import { nextSteps } from "../ui/next-steps.js";
import { showTemplateInfo } from "../ui/template-info.js";

export async function createProject(templateSlug: string, projectName: string) {
  const startTime = Date.now();

  let template: Template | undefined;
  let authResult: ProResult | undefined;

  let status: "success" | "failed" = "failed";
  let failedReason: string | undefined;

  const projectPath = path.resolve(process.cwd(), projectName);

  try {
    // Step 1: Directory check
    log.blank();
    await handleExistingDirectory(projectPath, projectName);

    log.divider();

    //  Step 2: Fetch template
    template = await stepFetchTemplate(templateSlug);

    //  Step 3: Show info
    showTemplateInfo(template);

    //  Step 4: Confirm (only for paid templates)
    if (template.isPro && template.creditCost > 0) {
      await confirmStart(template.creditCost);
    }

    // Step 5: Auth (only for paid templates)
    if (template.isPro) {
      authResult = await handleAuth(template._id);
    }

    // Step 6: Download
    await downloadTemplate(
      template._id,
      authResult?.shortLivedToken,
      authResult?.userId,
      projectName
    );

    // Step 7: Success UI
    log.blank();
    log.divider();
    log.success("Setup completed successfully!");
    log.divider();

    if (!template.isRepoTemplate) {
      log.blank();
      const steps = [
        projectName === "." ? "" : `cd ${projectName}`,
        template.installer.installCommand,
        `${template.installer.name} run dev`,
      ].filter(Boolean);

      nextSteps(steps);
    } else {
      log.blank();
      log.step("Install dependencies:");

      if (template.installer.dependencies) {
        log.option(
          `${chalk.green("npm install")} ${template.installer.dependencies}`
        );
      }

      if (template.installer.devDependencies) {
        log.option(
          `${chalk.green("npm install")} ${chalk.dim("--save-dev")} ${template.installer.devDependencies}`
        );
      }

      log.blank();
    }

    log.blank();

    status = "success";
  } catch (err) {
    status = "failed";

    const message = errorMessage(err);
    failedReason = message;

    log.blank();
    log.error(message);
  } finally {
    // analytics (non-blocking)
    if (template) {
      sendAnalytics({
        templateId: template._id,
        userId: authResult?.userId,
        status,
        failedReason,
        duration: Date.now() - startTime,
        installedAt: new Date(startTime).toISOString(),
      });
    }
  }
}

async function stepFetchTemplate(slug: string): Promise<Template> {
  const spinner = spin("Fetching template...");

  try {
    const template = await fetchTemplate(slug);
    succeed(spinner, "Template found successfully");
    return template;
  } catch (err) {
    fail(spinner, "Failed to fetch template");
    throw err;
  } finally {
    stop(spinner!);
    log.divider();
  }
}
