import { useState } from "react";

import { UpdateProfileData } from "@repo/shared";
import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const update = async (data: UpdateProfileData) => {
    try {
      setLoading(true);

      const response = await http.patch(`/user/update`, data);

      toastManager.add({
        title: "Success! Update profile",
        description: "Profile Updated successfully.",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error?.message || "Update profile failed.";

      toastManager.add({
        title: "Uh oh! Update profile failed",
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
