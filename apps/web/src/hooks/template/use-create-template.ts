import { useState } from "react";

import { CreateTemplateInput } from "@repo/shared";
import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useCreateTemplate = () => {
  const [loading, setLoading] = useState(false);

  const create = async (data: CreateTemplateInput) => {
    try {
      setLoading(true);

      const response = await http.post("/admin/template", data);

      toastManager.add({
        title: "Success! Register template",
        description: "Template created successfully.",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error?.message || "Create template failed.";

      toastManager.add({
        title: "Uh oh! Create template failed",
        description: message,
        type: "error",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    create,
    loading,
  };
};
