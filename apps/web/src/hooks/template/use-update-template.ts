import { useState } from "react";

import { UpdateTemplateInput } from "@repo/shared";
import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useUpdateTemplate = () => {
  const [loading, setLoading] = useState(false);

  const update = async (templateId: string, data: UpdateTemplateInput) => {
    try {
      setLoading(true);

      const response = await http.patch(`admin/template/${templateId}`, data);

      toastManager.add({
        title: "Success! Update template",
        description: "Template Updated successfully.",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error?.message || "Update template failed.";

      toastManager.add({
        title: "Uh oh! Update template failed",
        description: message,
        type: "error",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    update,
    loading,
  };
};
