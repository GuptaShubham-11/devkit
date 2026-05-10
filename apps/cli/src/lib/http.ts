import axios from "axios";

import { RUNTIME, URLS } from "../config/constant.js";

const http = axios.create({
  baseURL: RUNTIME.isDev ? URLS.local : URLS.backend,
  timeout: 120000,
});

export { http };
