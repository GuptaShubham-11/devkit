import { z } from "zod";

// Common patterns
export const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const passwordPatternLetter = /(?=.*[A-Za-z])/;
export const passwordPatternNumber = /(?=.*[0-9])/;
export const passwordPatternSpecial = /(?=.*[!@#$%&*])/;

// Registration
export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email is too long")
    .regex(emailPattern, "Invalid email address")
    .toLowerCase()
    .trim(),
  password: z
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

// Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email is too long")
    .regex(emailPattern, "Invalid email address")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "Password is required")
    .max(64, "Password is too long")
    .trim(),
});

// Pro Access
export const proAccessSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email is too long")
    .regex(emailPattern, "Invalid email address")
    .toLowerCase()
    .trim(),
  privateKey: z
    .string("Private key is required")
    .min(1, "Private key is required"),
  templateId: z.string("Template id is required"),
});

// OTP Request
export const requestOtpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email is too long")
    .regex(emailPattern, "Invalid email address")
    .toLowerCase()
    .trim(),
  type: z.enum(["register", "resetPassword"]),
});

// OTP Verification
export const verifyOtpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email is too long")
    .regex(emailPattern, "Invalid email address")
    .toLowerCase()
    .trim(),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 characters")
    .regex(/^\d{6}$/, "OTP must be numeric")
    .trim(),
});

// Password Reset
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email is too long")
    .regex(emailPattern, "Invalid email address")
    .toLowerCase()
    .trim(),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 characters")
    .regex(/^\d{6}$/, "OTP must be numeric")
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

// Types
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type RequestOtpData = z.infer<typeof requestOtpSchema>;
export type VerifyOtpData = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
