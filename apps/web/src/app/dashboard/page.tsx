"use client";

import { useQuery } from "@tanstack/react-query";

import { useIsMobile } from "@repo/ui";

import { Dashboard } from "@/components/dashboard/dashboard";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { http } from "@/lib/http";

// import { charts } from "@/mock-data/charts";

export default function DashboardPage() {
  const isMobile = useIsMobile();

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

  if (isLoading) return <DashboardSkeleton />;

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
