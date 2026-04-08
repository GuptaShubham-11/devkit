import { z } from "zod";

export const createTemplateSchema = z.object({
  name: z
    .string("Name is required")
    .min(1, "Name is required")
    .max(100, "Name too long"),
  slug: z.string("Slug is required").min(1, "Slug is required").max(100),
  description: z
    .string("Description is required")
    .min(10, "Description too short")
    .max(500),
  creditCost: z.number("Credit cost is required"),
  stack: z
    .array(z.string("Stack is required"))
    .min(1, "At least one stack required"),
  repoUrl: z
    .string("Repository URL is required")
    .url("Invalid repository URL")
    .max(500),
  tags: z.array(z.string("Tags are required")).max(20, "Max 20 tags"),
  version: z
    .string("Version is required")
    .regex(/^\d+\.\d+\.\d+$/, "Invalid version format (e.g. 1.0.0)"),
  installer: z.object({
    name: z.string(),
    depedencies: z.array(z.string()),
    devDepedencies: z.array(z.string()),
    installCommand: z.string(),
    addDependenciesCommand: z.string(),
    addDevDependenciesCommand: z.string(),
  }),
  isPro: z.boolean("Pro is required"),
  isRepoTemplate: z.boolean("Repo template is required"),
  isFeatured: z.boolean("Featured is required"),
  videoUrl: z.string().url("Invalid URL").optional(),
  isSponsored: z.boolean("Sponsored is required"),
  isPublished: z.boolean("Published is required"),
  folderStructureImage: z.string().url("Invalid URL"),
  isDeleted: z.boolean("Deleted is required"),
  sponsoredBy: z
    .object({
      name: z.string(),
      url: z.string().url("Invalid URL"),
      logo: z.string().url("Invalid URL"),
    })
    .optional(),
});

export const updateTemplateSchema = createTemplateSchema.partial();

export const getTemplatesSchema = z.object({
  userId: z.string("User id is required").optional(),
  limit: z.number("Limit is required").min(1, "Limit is required").max(100),
  offset: z.number("Offset is required").min(0, "Offset is required").max(1000),
  search: z.string("Search is required").optional(),
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
  isPro: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isSponsored: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
  isRepoTemplate: z.boolean().default(false),
});

export const slugSchema = z
  .string("Slug is required")
  .min(1, "Slug is required")
  .trim()
  .toLowerCase()
  .regex(/^[a-z]+(-[a-z]+)*$/, "Invalid slug format")
  .max(100);

export const downloadTemplateSchema = z.object({
  templateId: z.string("Template id is required"),
  shortLivedToken: z
    .string("Token is required")
    .min(11, "At least 11 characters")
    .max(11),
  userId: z.string("User id is required"),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>;
export type GetTemplatesInput = z.infer<typeof getTemplatesSchema>;
export type DownloadTemplateInput = z.infer<typeof downloadTemplateSchema>;

export type SlugSchema = z.infer<typeof slugSchema>;
