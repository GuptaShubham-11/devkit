import { z } from "zod";

import {
  passwordPatternLetter,
  passwordPatternNumber,
  passwordPatternSpecial,
} from "./auth";

// Profile Update
export const updateProfileSchema = z.object({
  name: z.string().max(50, "Name is too long").optional(),
  profileImage: z.string().url("Invalid profileImage URL").optional(),
  bio: z.string().max(100, "Bio is too long").optional(),
  website: z.string().url("Invalid website URL").optional(),
  githubUsername: z
    .string()
    .max(39, "GitHub username too long")
    .regex(/^[a-zA-Z0-9-]+$/, "Invalid GitHub username")
    .optional(),
  privateKey: z.string().min(11, "Private key is required").optional(),
});

// Change Password
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Current password is required")
    .max(64, "Password is too long")
    .trim(),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .regex(passwordPatternLetter, "Password must contain at least one letter")
    .regex(passwordPatternNumber, "Password must contain at least one number")
    .regex(
      passwordPatternSpecial,
      "Password must contain at least one special character"
    )
    .trim(),
});

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
