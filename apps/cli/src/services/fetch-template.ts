import { RUNTIME } from "../config/constant.js";
import { errorMessage } from "../lib/error-message.js";
import { http } from "../lib/http.js";

export async function fetchTemplate(slug: string) {
  if (!slug || typeof slug !== "string") {
    throw new Error("Template slug is required.");
  }

  try {
    const response = await http.get(`/registry/template/${slug}`);
    const template = response.data?.template;

    if (!template) {
      throw new Error("Invalid registry response!");
    }

    return template;
  } catch (err: unknown) {
    // if (RUNTIME.isDev) {
    //   console.error(err);
    // }
    throw new Error(errorMessage(err));
  }
}
