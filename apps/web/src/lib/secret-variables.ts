export function secretVariables() {
  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET,
    MONGODB_URI,
    EMAIL_USER,
    APP_PASSWORD,
    IMAGEKIT_PRIVATE_KEY,
    ROLE,
    GEMINI_API_KEY,
    GITHUB_SECRET_TOKEN,
    NODE_ENV,
    SALT_ROUNDS,
    PRIVATE_KEY_LENGTH,
    API_BASE_URL,
    NEXT_PUBLIC_LOGO_DEV_KEY,
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  } = process.env;

  if (!NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET missing");
  }

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Google OAuth env missing");
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI missing");
  }

  if (!EMAIL_USER || !APP_PASSWORD) {
    throw new Error("Email credentials missing");
  }

  if (!IMAGEKIT_PRIVATE_KEY) {
    throw new Error("IMAGEKIT_PRIVATE_KEY missing");
  }

  if (!SALT_ROUNDS) {
    throw new Error("SALT_ROUNDS missing");
  }

  if (!PRIVATE_KEY_LENGTH) {
    throw new Error("PRIVATE_KEY_LENGTH missing");
  }

  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL missing");
  }

  if (!NEXT_PUBLIC_LOGO_DEV_KEY) {
    throw new Error("NEXT_PUBLIC_LOGO_DEV_KEY missing");
  }

  return {
    // auth
    NEXTAUTH_SECRET,

    // google
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,

    // db
    MONGODB_URI,

    // email
    EMAIL_USER,
    APP_PASSWORD,

    // imagekit
    IMAGEKIT_PRIVATE_KEY,

    // api keys
    GEMINI_API_KEY,
    GITHUB_SECRET_TOKEN,
    NEXT_PUBLIC_LOGO_DEV_KEY,
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,

    // config
    ROLE,
    NODE_ENV,

    // security
    SALT_ROUNDS: Number(SALT_ROUNDS),
    PRIVATE_KEY_LENGTH: Number(PRIVATE_KEY_LENGTH),

    // api
    API_BASE_URL,
  };
}
