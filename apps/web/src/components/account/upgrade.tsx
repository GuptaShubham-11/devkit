"use client";

import { ArrowUpRightIcon, CheckIcon, CrownIcon } from "lucide-react";

import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  Separator,
  Spinner,
} from "@repo/ui";

import { useCheckout } from "@/hooks/payment/useCheckout";

type UpgradeProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const features = [
  "Production ready templates",
  "Reusable architecture systems",
  "Scalable flows",
  "Advanced SaaS foundations",
  "Priority premium updates",
];

export const Upgrade = ({ open, setOpen }: UpgradeProps) => {
  const { loading, checkout } = useCheckout();

  const handleCheckout = async () => {
    const response = await checkout({ plan: "pro_50_credits" });

    if (response) {
      setOpen(false);
      window.open(response.data.checkoutUrl, "_blank");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPopup
        showCloseButton={false}
        className="border-surface-secondary bg-surface-primary font-inter overflow-hidden border p-0 sm:max-w-2xl"
      >
        <DialogHeader className="bg-surface-secondary/30 flex flex-row items-center justify-between gap-2 rounded-t-2xl border-b">
          <div className="flex flex-col">
            <h2 className="flex items-center gap-2 text-xl leading-tight font-medium">
              Upgrade to premium plan
              <CrownIcon className="fill-accent-warning text-accent-warning size-4" />
            </h2>

            <div className="text-text-muted mt-0.5 flex items-center gap-1 text-xs">
              You will save <b>hours</b> of your time
            </div>
          </div>
          {/* top label */}
          <div className="border-surface-secondary bg-accent-primary text-text-primary w-fit border px-2 py-1 text-xs font-medium tracking-wide">
            MOST POPULAR
          </div>
        </DialogHeader>

        <DialogPanel className="grid gap-0 lg:grid-cols-[1fr_auto_2fr]">
          {/* left */}
          <div className="p-4">
            {/* heading */}
            <div>
              <h2 className="text-text-muted max-w-lg text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
                Stop rebuilding the same infrastructure.
              </h2>
            </div>

            {/* features */}
            <div className="mt-6 flex flex-col gap-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckIcon className="size-3 text-emerald-400" />
                  </div>

                  <span className="text-text-secondary text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* trust */}
            <p className="text-text-muted mt-4 max-w-md text-xs leading-relaxed">
              Used for SaaS products, AI tools, startup MVPs, and scalable
              internal platforms.
            </p>
          </div>

          <Separator orientation="vertical" className="hidden lg:block" />

          <Separator className="lg:hidden" />

          {/* right */}
          <div className="relative flex flex-col justify-between overflow-hidden p-4">
            {/* ambient */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl" />
            </div>

            <div className="relative">
              {/* pricing */}
              <div className="mt-2">
                <div className="flex items-end gap-2">
                  <span className="text-text-primary text-5xl leading-none font-semibold tracking-tight">
                    $9.19
                  </span>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-text-muted text-sm line-through">
                      $19.19
                    </span>

                    <span className="text-xs font-medium text-emerald-300">
                      Save 52%
                    </span>
                  </div>
                </div>
              </div>

              {/* visual value */}
              <div className="border-surface-secondary bg-bg-secondary/60 mt-4 overflow-hidden border">
                {/* metrics */}
                <div className="grid grid-cols-2">
                  <div className="border-surface-secondary border-r p-4">
                    <p className="text-text-secondary text-2xl font-semibold tracking-tight">
                      Hours
                    </p>

                    <span className="text-text-muted block text-xs font-medium">
                      average saved
                    </span>
                  </div>

                  <div className="p-4">
                    <p className="text-text-secondary text-2xl font-semibold tracking-tight">
                      Instant
                    </p>

                    <span className="text-text-muted block text-xs font-medium">
                      production setup
                    </span>
                  </div>
                </div>
                <div className="border-surface-secondary border-t p-4">
                  <div className="flex items-end gap-2">
                    <span className="text-text-muted text-lg font-medium tracking-tight">
                      50 Pro Credits Included
                    </span>
                  </div>

                  <p className="text-text-muted mt-1 text-sm leading-relaxed">
                    As a first‑time upgrade offer, your free plan’s
                    <span className="text-text-secondary font-medium">
                      {" "}
                      20 credits{" "}
                    </span>
                    will be converted into Pro credits, giving you a total of
                    <span className="text-text-primary font-medium">
                      {" "}
                      70 Pro Credits{" "}
                    </span>
                    to use across premium templates and systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
        {/* action */}
        <DialogFooter className="sm:justify-between">
          <p className="text-text-muted text-center text-xs leading-6">
            • Instant access • Secure checkout
          </p>

          <Button size="sm" disabled={loading} onClick={handleCheckout}>
            {loading ? (
              <>
                <Spinner /> upgrading to pro
              </>
            ) : (
              "Upgrade to Pro"
            )}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
};
