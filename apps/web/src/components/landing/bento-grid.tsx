import { motion } from "framer-motion";
import { SaudiRiyalIcon, Signature } from "lucide-react";

const gridItems = [
  {
    id: "01",
    title: "Modular Infrastructure",
    description:
      "Mix reusable modules and compose applications with flexible production-ready building blocks.",
    className: "col-span-4 md:col-span-2 md:row-span-2 bg-bg-secondary",
    titleClass: "text-3xl sm:text-4xl lg:text-5xl",
    contentSpacing: "mt-10 sm:mt-14",
    padding: "p-5 sm:p-8 lg:p-10",
  },
  {
    id: "02",
    title: "Starter Templates",
    description:
      "Curated starter repositories with clean architecture, modern tooling, and scalable structure.",
    className: "col-span-4 md:col-span-2 bg-surface-primary",
    titleClass: "text-2xl sm:text-3xl",
    contentSpacing: "mt-6",
    padding: "p-5 sm:p-8",
  },
  {
    id: "03",
    title: "Deployment Flows",
    description:
      "Ship applications faster with scalable foundations, deployment flows, and maintainable architecture.",
    className: "col-span-4 md:col-span-2 md:row-span-2 bg-surface-primary",
    titleClass: "text-3xl sm:text-4xl lg:text-5xl",
    contentSpacing: "mt-10 sm:mt-14",
    padding: "p-5 sm:p-8 lg:p-10",
  },
  {
    id: "04",
    title: "Secure Authentication",
    description:
      "OAuth, sessions, JWT, RBAC, email verification, and protected route systems built for production.",
    className: "col-span-4 md:col-span-2 bg-bg-secondary",
    titleClass: "text-2xl sm:text-3xl",
    contentSpacing: "mt-6",
    padding: "p-5 sm:p-8",
  },
];

export const BentoGrid = () => {
  return (
    <section className="font-inter flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-20">
      {/* badge */}
      <div className="border-surface-secondary text-text-secondary flex items-center gap-2 rounded-full border-y px-4 py-2 text-xs font-medium tracking-wide">
        <SaudiRiyalIcon className="text-accent-warning size-4" />

        <span>Wall of value</span>
      </div>

      {/* heading */}
      <div className="mt-4 flex max-w-4xl flex-col items-center justify-center text-center">
        <h2 className="text-text-secondary text-3xl leading-none font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl xl:text-6xl">
          the platform provides value ...
        </h2>

        <p className="bg-accent-warning text-text-primary mt-5 px-4 py-1 text-sm font-medium tracking-tight">
          ... so you can build value
        </p>
      </div>

      {/* grid */}
      <div className="border-surface-secondary bg-surface-primary mt-12 grid w-full grid-cols-4 overflow-hidden border">
        {gridItems.map((item) => (
          <motion.div
            key={item.id}
            className={`border-surface-secondary relative overflow-hidden border ${item.className} ${item.padding} `}
          >
            <span className="text-text-primary flex h-11 w-11 items-center justify-center border border-white/10 bg-white/3 text-sm font-medium">
              {item.id}
            </span>

            <div className={`${item.contentSpacing} max-w-xl`}>
              <h4
                className={`text-text-primary leading-none font-semibold tracking-tight ${item.titleClass} `}
              >
                {item.title}
              </h4>

              <p className="text-text-muted mt-5 max-w-md text-sm leading-7 sm:text-[15px]">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Block 05 */}
        <motion.div className="border-surface-secondary bg-bg-secondary relative col-span-4 border p-5 sm:p-8 md:col-span-3">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="text-text-primary flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 bg-white/3 text-sm font-medium">
              05
            </span>

            <div className="max-w-2xl">
              <h4 className="text-text-primary text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Build production systems faster
              </h4>

              <p className="text-text-muted mt-4 max-w-xl text-sm leading-7 sm:text-[15px]">
                Reusable SaaS modules, scalable architecture, authentication, AI
                workflows, and production-ready foundations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Block 06 */}
        <motion.div className="border-surface-secondary bg-surface-primary relative col-span-4 border p-5 sm:p-8 md:col-span-1">
          <span className="text-text-primary flex h-11 w-11 items-center justify-center border border-white/10 bg-white/3 text-sm font-medium">
            06
          </span>

          <div className="mt-2 flex items-center justify-center">
            <Signature className="text-brand-primary size-6 -rotate-6 stroke-1 sm:size-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
