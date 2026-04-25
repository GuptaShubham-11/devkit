import { RUNTIME } from "../config/constant.js";
import { http } from "../lib/http.js";

type AnalyticsPayload = {
  templateId: string;
  userId?: string;
  status: "success" | "failed";
  failedReason?: string;
  duration: number;
  installedAt: string;
};

export function sendAnalytics(payload: AnalyticsPayload): void {
  // do not block CLI execution
  queueMicrotask(async () => {
    if (!payload?.templateId) return;

    try {
      await http.post("/installs/add", payload, {
        timeout: 8000,
        validateStatus: () => true,
      });
    } catch (err) {
      if (RUNTIME.isDev || process.env.DEVKIT_DEBUG) {
        console.warn("[analytics] failed:", err);
      }
    }
  });
}
