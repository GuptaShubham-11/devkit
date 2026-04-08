import crypto from "crypto";

type Options = {
  length?: number;
  numbers?: boolean;
  symbols?: boolean;
  characters?: boolean;
};

export function generateRandom({
  length = 6,
  numbers = true,
  symbols = false,
  characters = false,
}: Options): string {
  let pool = "";

  if (numbers) pool += "0123456789";
  if (symbols) pool += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  if (characters)
    pool += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (!pool) {
    throw new Error("At least one character set must be enabled");
  }

  let result = "";

  for (let i = 0; i < length; i++) {
    const index = crypto.randomInt(0, pool.length);
    result += pool[index];
  }

  return result;
}
