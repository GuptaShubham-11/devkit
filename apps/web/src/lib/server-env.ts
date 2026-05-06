import "dotenv/config";

function required(value: string | undefined, key: string) {
  if (!value) {
    throw new Error(`${key} missing`);
  }

  return value;
}

export const serverEnv = {
  // DATABASE
  MONGODB_URI: required(process.env.MONGODB_URI, "MONGODB_URI"),

  // EMAIL
  EMAIL_USER: required(process.env.EMAIL_USER, "EMAIL_USER"),

  APP_PASSWORD: required(process.env.APP_PASSWORD, "APP_PASSWORD"),

  // AI
  GEMINI_API_KEY: required(process.env.GEMINI_API_KEY, "GEMINI_API_KEY"),

  // AUTH
  NEXTAUTH_SECRET: required(process.env.NEXTAUTH_SECRET, "NEXTAUTH_SECRET"),

  // Google
  GOOGLE_CLIENT_ID: required(process.env.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID"),

  GOOGLE_CLIENT_SECRET: required(
    process.env.GOOGLE_CLIENT_SECRET,
    "GOOGLE_CLIENT_SECRET"
  ),

  // SECURITY
  SALT_ROUNDS: Number(required(process.env.SALT_ROUNDS, "SALT_ROUNDS")),

  PRIVATE_KEY_LENGTH: Number(
    required(process.env.PRIVATE_KEY_LENGTH, "PRIVATE_KEY_LENGTH")
  ),

  // IMAGEKIT
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: required(
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    "NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT"
  ),

  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: required(
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    "NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY"
  ),

  IMAGEKIT_PRIVATE_KEY: required(
    process.env.IMAGEKIT_PRIVATE_KEY,
    "IMAGEKIT_PRIVATE_KEY"
  ),

  // GITHUB
  GITHUB_SECRET_TOKEN: required(
    process.env.GITHUB_SECRET_TOKEN,
    "GITHUB_SECRET_TOKEN"
  ),

  // APP CONFIG
  NODE_ENV: process.env.NODE_ENV || "development",

  NEXT_PUBLIC_API_BASE_URL: required(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    "NEXT_PUBLIC_API_BASE_URL"
  ),

  NEXT_PUBLIC_LOGO_DEV_KEY: required(
    process.env.NEXT_PUBLIC_LOGO_DEV_KEY,
    "NEXT_PUBLIC_LOGO_DEV_KEY"
  ),

  ROLE: process.env.ROLE || "admin",
};
