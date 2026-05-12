import { useEffect, useState } from "react";

import { CoinsIcon, SparklesIcon } from "lucide-react";

import { Skeleton } from "@repo/ui";

import { useCredit } from "@/hooks/payment/useCredit";

export const CreditDetail = () => {
  const { credit, loading } = useCredit();

  const [data, setData] = useState<any>();

  const handleCredit = async () => {
    const response = await credit();

    if (response) {
      setData(response?.data);
    }
  };

  useEffect(() => {
    handleCredit();
  }, []);

  if (loading) {
    return (
      <div className="border-surface-secondary bg-surface-primary border p-4">
        <Skeleton className="h-4 w-24" />

        <Skeleton className="mt-4 h-10 w-32" />

        <Skeleton className="mt-3 h-4 w-40" />
      </div>
    );
  }

  return (
    <div className="border-surface-secondary bg-surface-primary relative overflow-hidden border p-4">
      {/* ambient */}
      <div className="pointer-events-none absolute top-0 right-0 h-24 w-24 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative">
        {/* top */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-text-muted text-xs tracking-wide">
              Available Credits
            </span>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-text-primary text-4xl leading-none font-semibold tracking-tight">
                {data?.remainingCredits ?? 0}
              </span>

              <span className="text-text-muted mb-1 text-sm">remaining</span>
            </div>
          </div>

          <div className="border-surface-secondary bg-bg-secondary flex h-11 w-11 items-center justify-center border">
            <CoinsIcon className="size-5 text-amber-300" />
          </div>
        </div>

        {/* footer */}
        <div className="border-surface-secondary mt-5 flex items-center justify-between border-t pt-4">
          <div>
            <span className="text-text-muted text-[11px] tracking-wide">
              Total Credits
            </span>

            <p className="text-text-primary mt-1 text-sm font-medium">
              {data?.totalCredits ?? 0}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <SparklesIcon className="size-3.5" />
            Active
          </div>
        </div>
      </div>
    </div>
  );
};
