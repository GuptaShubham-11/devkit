import { axiosInstance } from "@repo/shared";

import { RUNTIME, URLS } from "../config/constant.js";

const http = axiosInstance.create({
  baseURL: RUNTIME.isDev ? URLS.local : URLS.backend,
});

export { http };
