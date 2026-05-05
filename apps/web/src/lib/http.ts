import { axiosInstance } from "@repo/shared";

import { secretVariables } from "./secret-variables";

const { API_BASE_URL } = secretVariables();

const http = axiosInstance.create({
  baseURL: API_BASE_URL,
});

export { http };
