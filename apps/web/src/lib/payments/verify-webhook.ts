import { webhookMetadataSchema } from "@repo/shared";

import { connectToDatabase } from "@/lib/db";
import { addCredits } from "@/lib/payments/add-credits";
import { CREDIT_PLANS } from "@/lib/payments/constants";
import { Payment } from "@/models/payment";
import { User } from "@/models/user";

/**
 * Webhook processing utilities.
 *
 * Responsibilities:
 * - Extract webhook payload data safely
 * - Validate metadata
 * - Enforce idempotency
 * - Create payment records
 * - Grant credits
 *
 * Notes:
 * - Amounts are stored in lowest denomination (cents)
 * - Credits are granted only after verified webhook events
 * - MongoDB remains source of truth
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
  metadata: AnyRecord;
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
  const paymentId =
    pick<string>(payload, ["data.payment.id", "data.id", "id"]) || "";

  const checkoutSessionId =
    pick<string>(payload, [
      "data.payment.checkout_session_id",
      "data.checkout_session_id",
      "data.session_id",
    ]) || undefined;

  const amount =
    pick<number>(payload, ["data.payment.amount", "data.amount"]) ?? 0;

  const currency =
    pick<string>(payload, ["data.payment.currency", "data.currency"]) || "USD";

  const status =
    pick<string>(payload, ["data.payment.status", "data.status"]) ||
    "succeeded";

  const invoiceUrl =
    pick<string>(payload, ["data.payment.invoice_url", "data.invoice_url"]) ||
    undefined;

  const metadata =
    pick<AnyRecord>(payload, [
      "data.payment.metadata",
      "data.metadata",
      "metadata",
    ]) || {};

  const eventType = (payload?.type as string) || "";

  return {
    eventType,
    paymentId,
    checkoutSessionId,
    amount,
    currency,
    status,
    invoiceUrl,
    metadata,
  };
}

function validatePaymentId(paymentId: string) {
  if (!paymentId) {
    throw new Error("payment.succeeded missing payment id");
  }
}

function validateWebhookMetadata(metadata: AnyRecord) {
  const parsed = webhookMetadataSchema.safeParse(metadata);

  if (!parsed.success) {
    throw new Error(
      `Webhook metadata invalid: ${
        parsed.error.issues?.[0]?.message ?? "invalid"
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

function pick<T = any>(
  obj: AnyRecord | undefined,
  paths: string[]
): T | undefined {
  if (!obj) {
    return undefined as T;
  }

  for (const path of paths) {
    const value = path
      .split(".")
      .reduce((acc: any, key: string) => (acc ? acc[key] : undefined), obj);

    if (value !== undefined && value !== null) {
      return value as T;
    }
  }

  return undefined as T;
}
