"use client";

import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { Spinner, useIsMobile } from "@repo/ui";

import { Dashboard } from "@/components/dashboard/dashboard";
import { useStatus } from "@/hooks/payment/useStatus";
import { http } from "@/lib/http";

// import { charts } from "@/mock-data/charts";

export default function DashboardPage() {
  const isMobile = useIsMobile();

  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const paymentStatus = searchParams.get("status");

  const { update } = useSession();
  const { status, loading: statusLoading } = useStatus();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await http.get(`/dashboard`);
      console.log(res.data.data);

      return res.data.data;
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  // payment sync
  useEffect(() => {
    if (!paymentId || paymentStatus !== "succeeded") {
      return;
    }

    const updatePayment = async () => {
      const response = await status(paymentId);

      if (response?.data?.paid) {
        update();
      }
    };

    updatePayment();
  }, [paymentId, paymentStatus, update]);

  if (isLoading) {
    return (
      <main className="font-inter flex min-h-screen items-center justify-center">
        <Spinner />
      </main>
    );
  }

  const { overview, charts, suggestions } = data;

  const installData = charts.installsLast10Days
    .slice(isMobile ? -5 : undefined)
    .map((d: { _id: string; count: number }) => ({
      date: d._id.slice(5),
      installs: d.count,
    }));

  const creditUsageData = charts.creditUsageLast10Days
    .slice(isMobile ? -5 : undefined)
    .map((d: { _id: string; total: number }) => ({
      date: d._id.slice(5),
      creditUsage: d.total,
    }));

  return (
    <main className="font-inter flex min-h-screen items-center justify-center">
      <Dashboard
        overview={overview}
        installData={installData}
        creditUsageData={creditUsageData}
        suggestions={suggestions}
        isFetching={isFetching}
      />
    </main>
  );
}
