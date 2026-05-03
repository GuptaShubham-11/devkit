import { z } from "zod";

const slugRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const semverRegex = /^\d+\.\d+\.\d+$/;

const nonEmptyTrimmed = (field: string) =>
  z.string().trim().min(1, `${field} is required`);

const urlField = (field: string) =>
  z.string().url(`Invalid ${field} URL`).max(500);

const baseTemplateSchema = z.object({
  name: nonEmptyTrimmed("Name").max(100),

  slug: nonEmptyTrimmed("Slug")
    .toLowerCase()
    .regex(slugRegex, "Slug must be lowercase-kebab-case")
    .max(100),

  description: z
    .string()
    .trim()
    .min(20, "Description should be at least 20 characters")
    .max(500),

  creditCost: z
    .number({ error: "Credit cost must be a number" })
    .min(0, "Credit cost cannot be negative")
    .max(1000, "Credit cost too high"),

  stack: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one stack")
    .max(10, "Max 10 technologies")
    .refine((arr) => new Set(arr).size === arr.length, {
      message: "Duplicate stack items not allowed",
    }),

  features: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one feature")
    .max(20, "Max 20 features")
    .refine((arr) => new Set(arr).size === arr.length, {
      message: "Duplicate features not allowed",
    }),

  tags: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one tag")
    .max(20, "Max 20 tags")
    .refine((arr) => new Set(arr).size === arr.length, {
      message: "Duplicate tags not allowed",
    }),

  repoUrl: urlField("repository"),
  liveUrl: urlField("live URL").optional(),
  codeUrl: urlField("code URL").optional(),

  version: z.string().regex(semverRegex, "Use semantic version (e.g. 1.0.0)"),

  installer: z.object({
    name: nonEmptyTrimmed("Installer name"),
    dependencies: z.string().trim().max(1000),
    devDependencies: z.string().trim().max(1000),
    installCommand: nonEmptyTrimmed("Install command"),
    addDependenciesCommand: nonEmptyTrimmed("Add dependencies command"),
    addDevDependenciesCommand: nonEmptyTrimmed("Add dev dependencies command"),
  }),

  withoutLogin: z.boolean(),
  isPro: z.boolean(),
  isRepoTemplate: z.boolean(),
  isFeatured: z.boolean(),
  isSponsored: z.boolean(),
  isPublished: z.boolean(),
  isDeleted: z.boolean(),

  folderStructure: z.string().max(10000).optional(),
  videoUrl: z.string().optional(),

  imageUrl: z.string().url("Image URL is required"),

  sponsoredBy: z
    .object({
      name: z.string().trim().optional(),
      url: z.string().optional(),
      logo: z.string().optional(),
    })
    .optional(),
});

export const createTemplateSchema = baseTemplateSchema.superRefine(
  (data, ctx) => {
    // Pro validation
    if (data.isPro && data.creditCost <= 0) {
      ctx.addIssue({
        path: ["creditCost"],
        code: z.ZodIssueCode.custom,
        message: "Pro templates must have credit cost > 0",
      });
    }

    // Sponsored validation
    if (data.isSponsored) {
      if (!data.sponsoredBy?.name) {
        ctx.addIssue({
          path: ["sponsoredBy.name"],
          code: z.ZodIssueCode.custom,
          message: "Sponsor name is required",
        });
      }

      if (!data.sponsoredBy?.url) {
        ctx.addIssue({
          path: ["sponsoredBy.url"],
          code: z.ZodIssueCode.custom,
          message: "Sponsor URL is required",
        });
      }
    }

    // Description quality
    if (data.description.split(" ").length < 5) {
      ctx.addIssue({
        path: ["description"],
        code: z.ZodIssueCode.custom,
        message: "Description too short (add more detail)",
      });
    }
  }
);

export const updateTemplateSchema = baseTemplateSchema
  .partial()
  .superRefine((data, ctx) => {
    if (data.isPro && data.creditCost !== undefined && data.creditCost <= 0) {
      ctx.addIssue({
        path: ["creditCost"],
        code: z.ZodIssueCode.custom,
        message: "Pro templates must have credit cost > 0",
      });
    }
  });

export const getTemplatesSchema = z.object({
  userId: z.string().optional(),
  limit: z.number().min(1).max(100),
  offset: z.number().min(0).max(1000),
  search: z.string().optional(),
  sort: z
    .enum([
      "slug",
      "createdAt",
      "updatedAt",
      "views",
      "copies",
      "downloads",
      "popular",
      "trending",
    ])
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).default("asc"),
  isPro: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isSponsored: z.boolean().optional(),
  isPublished: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
  isRepoTemplate: z.boolean().optional(),
});

export const slugSchema = z
  .string()
  .min(1)
  .trim()
  .toLowerCase()
  .regex(slugRegex, "Invalid slug format")
  .max(100);

export const downloadTemplateSchema = z.object({
  templateId: z.string(),
  shortLivedToken: z.string().length(11),
  userId: z.string(),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>;
export type GetTemplatesInput = z.infer<typeof getTemplatesSchema>;
export type DownloadTemplateInput = z.infer<typeof downloadTemplateSchema>;
export type SlugSchema = z.infer<typeof slugSchema>;
