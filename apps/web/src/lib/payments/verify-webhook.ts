import { webhookMetadataSchema } from "@repo/shared";

import { connectToDatabase } from "@/lib/db";
import { addCredits } from "@/lib/payments/add-credits";
import { CREDIT_PLANS } from "@/lib/payments/constants";
import { Payment } from "@/models/payment";
import { User } from "@/models/user";

/**
 * Dodo Payments Webhook Processing
 *
 * Responsibilities:
 * - Validate webhook metadata
 * - Prevent duplicate processing
 * - Store payment records
 * - Grant credits safely
 *
 * Notes:
 * - Credits are granted ONLY from verified webhooks
 * - MongoDB is source of truth
 * - Payment processing is idempotent
 */

type AnyRecord = Record<string, any>;

interface ExtractedPaymentFields {
  eventType: string;
  paymentId: string;
  checkoutSessionId?: string;
  amount: number;
  currency: string;
  status: string;
  invoiceUrl?: string;
  metadata: Record<string, any>;
}

export async function handlePaymentSucceeded(payload: AnyRecord) {
  const payment = extractPaymentFields(payload);

  validatePaymentId(payment.paymentId);

  const metadata = validateWebhookMetadata(payment.metadata);

  validatePlanMetadata(metadata);

  await connectToDatabase();

  await validateUser(metadata.userId);

  const existingPayment = await Payment.findOne({
    paymentId: payment.paymentId,
  }).lean();

  /**
   * Idempotency guard.
   * Prevent duplicate webhook retries
   * from granting credits multiple times.
   */
  if (existingPayment) {
    return {
      ok: true,
      idempotent: true,
    };
  }

  await createPaymentRecord({
    payment,
    metadata,
  });

  await addCredits({
    userId: metadata.userId,
    credits: metadata.credits,
    type: "purchase",
    referenceId: payment.paymentId,
    description: `Credits purchase (${metadata.planId})`,
    metadata: {
      checkoutSessionId: payment.checkoutSessionId,
      currency: payment.currency,
      amount: payment.amount,
    },
  });

  return {
    ok: true,
    idempotent: false,
  };
}

export function extractPaymentFields(
  payload: AnyRecord
): ExtractedPaymentFields {
  const data = payload?.data || {};

  return {
    eventType: payload?.type || "",

    paymentId: data.payment_id || "",

    checkoutSessionId: data.checkout_session_id || undefined,

    /**
     * Dodo returns amounts
     * in lowest denomination.
     *
     * Example:
     * INR → paise
     * USD → cents
     */
    amount: Number(data.total_amount || 0),

    currency: data.currency || "USD",

    status: data.status || "succeeded",

    invoiceUrl: data.invoice_url || undefined,

    metadata: data.metadata || {},
  };
}

function validatePaymentId(paymentId: string) {
  if (!paymentId) {
    throw new Error("payment.succeeded missing payment id");
  }
}

function validateWebhookMetadata(metadata: Record<string, any>) {
  const parsed = webhookMetadataSchema.safeParse(metadata);

  if (!parsed.success) {
    throw new Error(
      `Webhook metadata invalid: ${
        parsed.error.issues?.[0]?.message || "invalid"
      }`
    );
  }

  return parsed.data;
}

function validatePlanMetadata(params: { planId: string; credits: number }) {
  const plan = CREDIT_PLANS[params.planId as keyof typeof CREDIT_PLANS];

  if (!plan || plan.credits !== params.credits) {
    throw new Error("Webhook metadata credits mismatch with configured plan");
  }
}

async function validateUser(userId: string) {
  const user = await User.findById(userId).select("_id").lean();

  if (!user) {
    throw new Error("User not found for webhook");
  }
}

async function createPaymentRecord(params: {
  payment: ExtractedPaymentFields;

  metadata: {
    userId: string;
    planId: string;
    credits: number;
  };
}) {
  const { payment, metadata } = params;

  await Payment.create({
    userId: metadata.userId,
    paymentId: payment.paymentId,
    checkoutSessionId: payment.checkoutSessionId,
    planId: metadata.planId,
    amount: payment.amount,
    currency: payment.currency,
    creditsGranted: metadata.credits,
    status: payment.status,
    invoiceUrl: payment.invoiceUrl,
    metadata: payment.metadata,
  });
}
