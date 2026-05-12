"use client";

import { useState } from "react";

import { CheckoutData } from "@repo/shared";
import { toastManager } from "@repo/ui";

import { http } from "@/lib/http";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);

  const checkout = async (data: CheckoutData) => {
    try {
      setLoading(true);

      const response = await http.post("/payment/checkout", data);

      toastManager.add({
        title: "Success! Checkout successful!",
        description:
          response.data.message || "Redirecting to payment gateway...",
        type: "success",
      });

      return response;
    } catch (error: any) {
      const message = error.response.data.error || "Checkout failed!";

      toastManager.add({
        title: "Uh oh! Checkout failed!",
        description: message,
        type: "error",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    checkout,
    loading,
  };
};
