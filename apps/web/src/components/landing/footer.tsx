import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { ArrowRightToLineIcon } from "lucide-react";

import { Button } from "@repo/ui";

import { Brand } from "./brand";

const footerLinks = [
  {
    title: "Product",
    links: [
      {
        label: "Templates",
        href: "/templates",
      },
      {
        label: "Pricing",
        href: "/pricing",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "Payment",
        href: "/legal/payment-policy",
      },
      {
        label: "Terms",
        href: "/legal/terms",
      },
      {
        label: "Privacy",
        href: "/legal/privacy-policy",
      },
    ],
  },
  {
    title: "Developers",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/GuptaShubham-11",
      },
      {
        label: "Discord",
        href: "https://discord.com",
      },
      {
        label: "Get Started",
        href: "/auth/login",
      },
    ],
  },
  {
    title: "Socials",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/guptashubham11",
      },
      {
        label: "Twitter",
        href: "https://x.com/GuptaShubham91",
      },
    ],
  },
];

export const Footer = () => {
  const router = useRouter();
  return (
    <footer className="font-inter bg-muted relative w-full overflow-hidden border-t">
      <div className="relative mx-auto flex max-w-5xl flex-col px-5 pt-10 pb-10">
        {/* top */}
        <div className="flex flex-col justify-between gap-14 border-b pb-16 lg:flex-row">
          {/* brand */}
          <div className="max-w-md">
            <Brand />

            <div className="text-foreground mt-4 mb-4 max-w-sm border-t border-b text-center text-sm leading-relaxed text-balance">
              Our mission by the end of this year is to connect thousands of
              developers build faster.
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:w-full sm:flex-row">
              <Button
                onClick={() => router.push("/auth/register")}
                className="group relative overflow-hidden px-2 text-white transition-all duration-900 hover:pr-6 hover:shadow-[0_0_20px_-10px_rgba(99,102,241,0.65)]"
              >
                <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-900 group-hover:opacity-100" />

                <motion.span
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 50,
                  }}
                  className="absolute inset-0 my-0.5 flex -translate-x-full items-center justify-center bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-900 group-hover:translate-x-[38%] group-hover:opacity-100"
                >
                  <ArrowRightToLineIcon className="text-shadow-xs" />
                </motion.span>

                <span className="text-shadow-xs">Get Started</span>
              </Button>

              <Button
                variant="secondary"
                className="font-semibold text-shadow-2xs"
                onClick={() => router.push("/templates")}
              >
                Explore Templates
              </Button>
            </div>
          </div>

          {/* links */}
          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-foreground text-base font-semibold">
                  {section.title}
                </h3>

                <ul className="mt-2 space-y-1.5">
                  {section.links.map((item) => (
                    <li key={item.label}>
                      <span
                        onClick={() => router.push(item.href)}
                        className="text-muted-foreground hover:text-foreground cursor-pointer text-sm transition-colors duration-300"
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col-reverse items-center justify-between gap-6 pt-6 sm:flex-row">
          <p className="text-muted-foreground font-mono text-xs tracking-tight">
            © 2026 Devkit. All rights reserved. Built for velocity.
          </p>

          <a
            href="mailto:hello@developerkit.pro"
            className="bg-muted hover:bg-muted text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 border px-3 py-1 font-mono text-xs transition-all duration-200"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            hello@developerkit.pro
          </a>
        </div>
      </div>
    </footer>
  );
};
