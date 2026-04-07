import z from "zod";

export const getTransactionsSchema = z.object({
  userId: z.string("User id is required").optional(),
  limit: z.number("Limit is required").min(1, "Limit is required").max(50),
  offset: z.number("Offset is required").min(0, "Offset is required").max(100),
  sort: z.enum(["createdAt", "amount", "type"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("asc"),
  search: z.string("Search is required").optional(),
});

export type GetTransactionsSchema = z.infer<typeof getTransactionsSchema>;
