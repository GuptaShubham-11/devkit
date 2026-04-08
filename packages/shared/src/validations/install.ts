import z from "zod";

import { emailPattern } from "./auth";

export const createInstallSchema = z.object({
  userId: z.string("User id is required"),
  templateId: z
    .string("Template ID is required")
    .min(1, "Template ID is required")
    .max(100, "Template ID too long"),
  status: z.enum(
    ["failed", "success"],
    'Status must be either "failed" or "success"'
  ),
  duration: z.number("Duration is required").min(1, "Duration is required"),
  installedAt: z
    .string("Installed At is required")
    .min(1, "Installed At is required")
    .max(100, "Installed At too long"),
  failedReason: z.string("Failed Reason is required").optional(),
});

export const getInstallsSchema = z.object({
  userId: z.string("User id is required").optional(),
  templateId: z.string("Template id is required").optional(),
  limit: z.number("Limit is required").min(1, "Limit is required").max(50),
  offset: z.number("Offset is required").min(0, "Offset is required").max(100),
  sort: z.enum(["createdAt", "duration", "installedAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("asc"),
  search: z.string("Search is required").optional(),
});

export type CreateInstallSchema = z.infer<typeof createInstallSchema>;
export type GetInstallsSchema = z.infer<typeof getInstallsSchema>;
