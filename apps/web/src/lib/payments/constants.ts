/**
 * Dodo Payments - Credit Plans
 *
 * Notes:
 * - Amounts are stored in the smallest currency unit
 * - USD values are stored in cents
 * - Credits are granted only after verified webhook events
 *
 * Example:
 * - 919 = $9.19 USD
 */

export type CreditPlanId = "pro_50_credits";

export interface CreditPlan {
  /**
   * Number of credits granted
   * after successful payment.
   */
  credits: number;

  /**
   * Price in the lowest denomination.
   *
   * Example:
   * - 919 = $9.19
   */
  price: number;

  /**
   * ISO currency code.
   */
  currency: "USD";
}

export const CREDIT_PLANS: Record<CreditPlanId, CreditPlan> = {
  pro_50_credits: {
    credits: 50,
    price: 919,
    currency: "USD",
  },
} as const;

export function assertValidPlan(plan: string): asserts plan is CreditPlanId {
  if (!(plan in CREDIT_PLANS)) {
    throw new Error(`Invalid credit plan: ${plan}`);
  }
}

export function getPlan(planId: CreditPlanId): CreditPlan {
  return CREDIT_PLANS[planId];
}
