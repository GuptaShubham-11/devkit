import { connectToDatabase } from "@/lib/db";
import { http } from "@/lib/http";
import {
  assertValidPlan,
  CREDIT_PLANS,
  type CreditPlanId,
} from "@/lib/payments/constants";
import {
  dodoConfig,
  dodoHeaders,
  getProductIdForPlan,
} from "@/lib/payments/dodo";

interface CreateCheckoutSessionParams {
  userId: string;
  planId: CreditPlanId;
}

interface DodoCheckoutResponse {
  checkout_url?: string;
  session_id?: string;
}

interface CreateCheckoutSessionResponse {
  checkoutUrl: string;
  sessionId: string;
}

/**
 * Create a Dodo Payments checkout session for a predefined credit plan.
 *
 * Security Notes:
 * - Plan validation happens server-side
 * - Product mapping is resolved internally
 * - Frontend never controls credits or pricing
 * - Metadata is attached for webhook reconciliation
 *
 * References:
 * - https://docs.dodopayments.com/api-reference/checkout-sessions/create
 */

export async function createCheckoutSession({
  userId,
  planId,
}: CreateCheckoutSessionParams): Promise<CreateCheckoutSessionResponse> {
  await connectToDatabase();

  validatePlan(planId);

  const plan = CREDIT_PLANS[planId];
  const productId = getProductIdForPlan(planId);
  console.log(plan);

  const payload = buildCheckoutPayload({
    userId,
    productId,
    planId,
    credits: plan.credits.toString(),
  });

  let data: DodoCheckoutResponse;

  try {
    const response = await http.post<DodoCheckoutResponse>(
      "/checkouts",
      payload,
      {
        baseURL: dodoConfig.baseUrl,
        headers: {
          ...dodoHeaders(),
        },
      }
    );

    data = response.data;
  } catch (error: any) {
    const status = error?.response?.status;

    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      "Unknown error occurred.";

    throw new Error(
      [
        "Failed to create Dodo checkout session.",
        status ? `Status: ${status}.` : "",
        typeof message === "string" ? message : JSON.stringify(message),
      ]
        .filter(Boolean)
        .join(" ")
    );
  }

  validateCheckoutResponse(data);

  return {
    checkoutUrl: data.checkout_url,
    sessionId: data.session_id,
  };
}

function validatePlan(planId: CreditPlanId) {
  assertValidPlan(planId);
}

function buildCheckoutPayload(params: {
  userId: string;
  productId: string;
  planId: CreditPlanId;
  credits: string;
}) {
  const { userId, productId, planId, credits } = params;

  return {
    product_cart: [
      {
        product_id: productId,
        quantity: 1,
      },
    ],

    return_url: dodoConfig.returnUrl,

    metadata: {
      userId,
      planId,
      credits,
    },
  };
}

function validateCheckoutResponse(
  data: DodoCheckoutResponse
): asserts data is Required<DodoCheckoutResponse> {
  if (!data.checkout_url || !data.session_id) {
    throw new Error(
      "Dodo checkout session response is missing checkout_url or session_id."
    );
  }
}
