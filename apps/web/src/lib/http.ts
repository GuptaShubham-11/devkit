import { axiosInstance } from "@repo/shared";

import { secretVariables } from "./secret-variables";

const { NEXT_PUBLIC_API_BASE_URL } = secretVariables();

const http = axiosInstance.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
});

export { http };
