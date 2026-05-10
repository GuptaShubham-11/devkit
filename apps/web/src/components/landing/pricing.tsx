import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import {
  ArrowRightToLineIcon,
  BadgeCheckIcon,
  CheckIcon,
  DollarSignIcon,
  IndianRupeeIcon,
  Plus,
  PlusIcon,
} from "lucide-react";

import { Button, Separator } from "@repo/ui";

export const Pricing = () => {
  const router = useRouter();
  return (
    <section className="font-inter flex flex-col items-center justify-center overflow-hidden pt-20 pb-20">
      <span className="border-surface-secondary text-text-secondary flex items-center gap-2 rounded-full border-y px-4 py-2 text-xs">
        <IndianRupeeIcon className="text-accent-success size-4" />
        Wall of plan
      </span>

      <div className="mt-3 flex max-w-3xl flex-col items-center justify-center text-center">
        <h2 className="text-text-secondary text-3xl font-semibold tracking-tight md:text-5xl">
          simple pricing
        </h2>

        <p className="bg-accent-success text-text-primary mt-4 px-4 py-1 text-sm font-medium">
          Choose your plan and save your valuable time.
        </p>
      </div>

      <div className="mt-6 grid items-center justify-center sm:grid-cols-[1fr_auto_1fr] md:max-w-3xl">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 px-4 md:pt-20">
            <span className="text-text-secondary flex items-center text-5xl font-bold">
              <DollarSignIcon className="size-6" />
              0.00
            </span>
            <h4 className="text-text-secondary flex flex-col items-start text-lg leading-tight font-medium">
              Free
              <p className="text-text-muted text-sm">
                For developers exploring
              </p>
            </h4>
          </div>
          <Separator />

          <div className="text-text-muted mt-4 flex flex-col gap-1 font-medium">
            <span className="flex items-center gap-2">
              <CheckIcon className="text-accent-success size-4" />
              20 credits included
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="text-accent-success size-4" />
              Access basic templates
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="text-accent-success size-4" />
              Lifetime access
            </span>
            <Button
              size="sm"
              onClick={() => router.push("/auth/register")}
              className="group border-brand-primary/40 bg-brand-primary text-text-primary hover:border-brand-primary hover:bg-brand-primary-600 relative mt-2 w-fit overflow-hidden rounded-xl border px-2 transition-all duration-900 hover:pr-4 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.65)] active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-900 group-hover:opacity-100" />

              <motion.span
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="relative font-medium tracking-tight transition-all duration-600 group-hover:pr-2 group-hover:font-semibold"
              >
                <motion.span
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                  }}
                  className="absolute inset-0 flex -translate-x-full items-center justify-center bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-900 group-hover:translate-x-[55%] group-hover:opacity-100"
                >
                  <ArrowRightToLineIcon className="size-4" />
                </motion.span>

                <span className="relative duration-300">Get started</span>
              </motion.span>
            </Button>
          </div>
        </div>

        <Separator orientation="vertical" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-text-muted flex items-center text-base font-bold line-through">
              <DollarSignIcon className="size-4" />
              <span className="font-bold line-through">19.19</span>
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-text-primary flex items-center text-5xl font-bold">
                <DollarSignIcon className="size-6" />
                9.19
              </span>
              <h4 className="text-brand-primary flex flex-col items-start text-lg leading-tight font-medium">
                Premium
                <p className="text-text-muted text-sm">
                  For shipping fast products
                </p>
              </h4>
            </div>
          </div>

          <Separator />

          <div className="text-text-secondary relative mt-4 flex flex-col gap-1 font-medium">
            <span>
              <span className="flex items-center gap-2">
                <PlusIcon className="text-accent-primary size-4 stroke-2" />
                Free plan includes
              </span>
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="text-accent-success size-4" />
              50 credits included
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="text-accent-success size-4" />
              Access advanced templates
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="text-accent-success size-4" />
              Lifetime access
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="text-accent-success size-4" />
              Priority support
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="text-accent-success size-4" />
              Credits never expire
            </span>
            <div className="absolute inset-0 backdrop-blur-[2px]" />
            <div className="text-text-secondary absolute top-12 left-12 z-10 flex -rotate-20 items-center justify-center border px-2 py-2 text-xs font-medium tracking-wide uppercase backdrop-blur-md">
              <BadgeCheckIcon className="text-accent-success mr-2 size-4 stroke-2" />
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
