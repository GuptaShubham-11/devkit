// import { RUNTIME } from '../config/constant.js';
import { errorMessage } from "../lib/error-message.js";
import { http } from "../lib/http.js";
import { ProAccessResponse } from "./auth.js";

export async function verifyAccess(
  email: string,
  privateKey: string,
  templateId: string
): Promise<ProAccessResponse> {
  if (!email) {
    return { allowed: false, error: "Email is required!" };
  }

  if (!templateId) {
    return { allowed: false, error: "Template ID is required!" };
  }

  try {
    const { data, status } = await http.post<ProAccessResponse>(
      "/registry/access",
      {
        email,
        privateKey,
        templateId,
      }
    );

    if (typeof data.allowed !== "boolean") {
      throw new Error("Invalid response received from registry!");
    }

    return {
      ...data,
      status,
    };
  } catch (error) {
    // if (RUNTIME.isDev) console.error(error);

    return {
      allowed: false,
      error: errorMessage(error),
    };
  }
}
