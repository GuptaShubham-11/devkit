import { axiosInstance } from "@repo/shared";

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL must be set at apps/web/.env");
}

const http = axiosInstance.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export { http };
