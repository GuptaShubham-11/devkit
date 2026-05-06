import { axiosInstance } from "@repo/shared";

import { clientEnv } from "./client-env";

const http = axiosInstance.create({
  baseURL: clientEnv.API_BASE_URL!,
});

export { http };
