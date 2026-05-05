import { useState } from "react";

import { signOut } from "next-auth/react";

import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);

  const deleteAccount = async () => {
    try {
      setLoading(true);

      const response = await http.patch(`/user/delete-account`);
      await signOut();

      toastManager.add({
        title: "Success! Delete account",
        description: "Account deleted successfully.",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error?.message || "Account Delete failed.";

      toastManager.add({
        title: "Uh oh! Account Delete failed",
        description: message,
        type: "error",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  return {
    deleteAccount,
    loading,
  };
};
