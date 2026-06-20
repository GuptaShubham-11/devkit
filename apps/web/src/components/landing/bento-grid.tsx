import { motion } from "framer-motion";
import { SaudiRiyalIcon, Signature } from "lucide-react";

import { Container } from "../core/container";

const gridItems = [
  {
    id: "01",
    title: "Modular Infrastructure",
    description:
      "Mix reusable modules and compose applications with flexible production-ready building blocks.",
    className: "col-span-4 md:col-span-2 md:row-span-2",
    titleClass: "text-3xl sm:text-4xl lg:text-5xl",
    contentSpacing: "mt-6 sm:mt-8",
    padding: "p-6 sm:p-8 lg:p-10",
  },
  {
    id: "02",
    title: "Starter Templates",
    description:
      "Curated starter repositories with clean architecture, modern tooling, and scalable structure.",
    className: "col-span-4 md:col-span-2",
    titleClass: "text-3xl sm:text-4xl lg:text-5xl",
    contentSpacing: "mt-6",
    padding: "p-6 sm:p-8",
  },
  {
    id: "03",
    title: "UI and UX Engineering",
    description:
      "Crafting responsive landing pages with clean code, smooth animations, and high-converting layouts.",
    className: "col-span-4 md:col-span-2 md:row-span-2",
    titleClass: "text-3xl sm:text-4xl lg:text-5xl",
    contentSpacing: "mt-6 sm:mt-8",
    padding: "p-6 sm:p-8 lg:p-10",
  },
  {
    id: "04",
    title: "Secure Authentication",
    description:
      "OAuth, sessions, JWT, RBAC, email verification, and protected route systems built for production.",
    className: "col-span-4 md:col-span-2",
    titleClass: "text-2xl sm:text-4xl lg:text-5xl",
    contentSpacing: "mt-6",
    padding: "p-6 sm:p-8",
  },
];

export const BentoGrid = () => {
  return (
    <Container className="flex flex-col items-center justify-center py-6 md:py-12">
      {/* badge */}
      <div className="text-foreground flex items-center gap-2 rounded-full border-y px-4 py-2 text-xs font-medium tracking-wide">
        <SaudiRiyalIcon className="size-4 text-yellow-500" />

        <span className="text-shadow-2xs">Wall of value</span>
      </div>

      {/* heading */}
      <div className="mt-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-foreground text-3xl leading-none font-semibold tracking-tight text-balance md:text-4xl xl:text-5xl">
          the platform provides value
        </h2>

        <p className="text-foreground mt-4 bg-amber-500 px-4 py-0.5 text-sm font-medium tracking-tight">
          so you can build product.
        </p>
      </div>

      {/* grid */}
      <div className="mt-12 grid w-full grid-cols-4 overflow-hidden rounded-lg border">
        {gridItems.map((item) => (
          <motion.div
            key={item.id}
            className={`bg-muted relative overflow-hidden border ${item.className} ${item.padding} `}
          >
            <span className="text-foreground bg-background flex size-12 items-center justify-center border text-sm font-medium">
              {item.id}
            </span>

            <div className={`${item.contentSpacing} max-w-xl`}>
              <h4
                className={`text-foreground leading-none font-semibold tracking-tight ${item.titleClass} `}
              >
                {item.title}
              </h4>

              <p className="text-muted-foreground mt-4 max-w-md text-base leading-7">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Block 05 */}
        <motion.div className="bg-muted relative col-span-4 border p-5 sm:p-8 md:col-span-3">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <span className="text-foreground bg-background flex size-12 shrink-0 items-center justify-center border text-sm font-medium">
              05
            </span>

            <div className="max-w-2xl">
              <h4 className="text-foreground text-2xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Build & Ship Product Faster
              </h4>

              <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-7 sm:text-base">
                Reusable SaaS modules, scalable architecture, authentication, AI
                workflows, and production-ready foundations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Block 06 */}
        <motion.div className="bg-muted relative col-span-4 border p-5 sm:p-8 md:col-span-1">
          <span className="text-foreground bg-background flex size-12 items-center justify-center border text-sm font-medium">
            06
          </span>

          <div className="mt-2 flex items-center justify-center">
            <Signature className="text-primary size-6 -rotate-6 stroke-1 sm:size-10" />
          </div>
        </motion.div>
      </div>
    </Container>
  );
};
