// Next.js App Router webhook endpoint for Dodo Payments
// Docs:
// - Next.js Adapter: https://docs.dodopayments.com/developer-resources/nextjs-adaptor
// - Webhook Events: https://docs.dodopayments.com/developer-resources/webhooks
//
// Security:
// - Signature is verified by @dodopayments/nextjs Webhooks using HMAC and the webhook secret
// - Business logic is STRICTLY server-side and idempotent (see verify-webhook.ts)
import { Webhooks } from "@dodopayments/nextjs";

import { handlePaymentSucceeded } from "@/lib/payments/verify-webhook";
import { serverEnv } from "@/lib/server-env";

export const POST = Webhooks({
  webhookKey: serverEnv.DODO_WEBHOOK_SECRET,
  // Generic handler if you want to log or branch on event types
  // onPayload: async (payload) => {},

  // Required for credit wallet: grant credits on successful one-time payments
  onPaymentSucceeded: async (payload) => {
    // Idempotent business handling (ledger + payment unique constraints)
    await handlePaymentSucceeded(payload);
  },
});
