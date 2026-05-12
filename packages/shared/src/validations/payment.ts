import { z } from "zod";

// Allowed plan ids (keep in sync with CREDIT_PLANS keys)
export const checkoutBodySchema = z.object({
  plan: z.enum(["pro_50_credits"]),
});

export type CheckoutData = z.infer<typeof checkoutBodySchema>;

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(10),
  offset: z.coerce.number().min(0).max(10_000).default(0),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

// Webhook metadata validation for idempotent credit grants
export const webhookMetadataSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  planId: z.enum(["pro_50_credits"]),
  credits: z.coerce.number().int().positive(),
});

export type WebhookMetadata = z.infer<typeof webhookMetadataSchema>;
