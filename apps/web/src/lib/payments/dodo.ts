import { serverEnv } from "@/lib/server-env";

export type DodoEnvironment = "test_mode" | "live_mode";

type CreditPlanId = "pro_50_credits";

/**
 * Resolve Dodo Payments API base URL.
 *
 * Notes:
 * - test_mode → https://test.dodopayments.com
 * - live_mode → https://live.dodopayments.com
 *
 * Important:
 * - Do NOT use api.dodopayments.com
 */

export function getDodoBaseUrl(environment: DodoEnvironment) {
  return environment === "test_mode"
    ? "https://test.dodopayments.com"
    : "https://live.dodopayments.com";
}

const environment =
  (serverEnv.DODO_PAYMENTS_ENVIRONMENT as DodoEnvironment) || "live_mode";

export const dodoConfig = {
  bearerToken: serverEnv.DODO_PAYMENTS_API_KEY,

  environment,

  returnUrl: serverEnv.DODO_PAYMENTS_RETURN_URL,

  webhookSecret: serverEnv.DODO_WEBHOOK_SECRET,

  baseUrl: getDodoBaseUrl(environment),
} as const;

/**
 * Product mapping between internal plans
 * and Dodo dashboard product IDs.
 *
 * Environment Variables:
 * - PRO_50_CREDITS
 */

const PRODUCT_ENV_KEYS: Record<CreditPlanId, string> = {
  pro_50_credits: "PRODUCT_PRO_50_CREDITS",
};

/**
 * Resolve Dodo Product ID for a credit plan.
 *
 * Throws:
 * - if env mapping is missing
 */

export function getProductIdForPlan(planId: CreditPlanId) {
  const envKey = PRODUCT_ENV_KEYS[planId];

  const productId = process.env[envKey];

  if (!productId) {
    throw new Error(
      [
        `Missing Dodo product mapping for plan "${planId}".`,
        `Expected environment variable: ${envKey}`,
      ].join(" ")
    );
  }

  return productId;
}

//  Shared headers for Dodo API requests.
export function dodoHeaders() {
  return {
    "Content-Type": "application/json",

    Authorization: `Bearer ${dodoConfig.bearerToken}`,
  };
}
