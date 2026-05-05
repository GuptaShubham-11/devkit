import { useState } from "react";

import { signOut } from "next-auth/react";

import { ChangePasswordData } from "@repo/shared";
import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const update = async (data: ChangePasswordData) => {
    try {
      setLoading(true);

      const response = await http.patch(`/user/change-password`, data);

      await signOut();

      toastManager.add({
        title: "Success! Update password",
        description: "Password Updated successfully! Redirecting to login...",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error?.response?.data.error || "Update password failed.";

      toastManager.add({
        title: "Uh oh! Update password failed",
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
