"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import {
  ArrowRightToLineIcon,
  BadgeQuestionMarkIcon,
  ChevronDownIcon,
  FingerprintIcon,
  HomeIcon,
  IndianRupeeIcon,
  Layers2Icon,
  LogInIcon,
} from "lucide-react";

import {
  Button,
  cn,
  Menu,
  MenuGroup,
  MenuItem,
  MenuPopup,
  MenuTrigger,
  Separator,
} from "@repo/ui";

import { Logo } from "../core/logo";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="font-inter z-50 mt-8 h-16 w-full border backdrop-blur-lg">
      <nav className="flex h-full items-center justify-between px-2 sm:px-4">
        <span className="text-text-primary flex items-center tracking-tight">
          <Logo size={72} />
          <span className="text-xl select-none">devkit</span>
        </span>

        <div className="flex items-center gap-2">
          <Explore router={router} />
          <Separator orientation="vertical" />
          <Button
            size="sm"
            onClick={() => router.push("/auth/register")}
            className="group border-brand-primary/40 bg-brand-primary text-text-primary hover:border-brand-primary hover:bg-brand-primary-600 relative overflow-hidden rounded-xl border px-2 transition-all duration-900 hover:pr-4 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.65)] active:scale-[0.98]"
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

              <span className="relative duration-300">Get Started</span>
            </motion.span>
          </Button>
        </div>
      </nav>
    </header>
  );
};

const productItems = [
  {
    label: "Templates",
    href: "/templates",
    icon: <Layers2Icon className="text-text-secondary size-4" />,
  },
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="text-text-secondary size-4" />,
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: <IndianRupeeIcon className="text-text-secondary size-4" />,
  },
  {
    label: "Help",
    href: "/help",
    icon: <BadgeQuestionMarkIcon className="text-text-secondary size-4" />,
  },
  {
    label: "Sign In",
    href: "/auth/login",
    icon: <LogInIcon className="text-text-secondary size-4" />,
  },
  {
    label: "Sign Up",
    href: "/auth/register",
    icon: <FingerprintIcon className="text-text-secondary size-4" />,
  },
];

export function Explore({ router }: { router: any }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Menu open={open} onOpenChange={setOpen}>
      <MenuTrigger
        className="group rounded-xl"
        openOnHover
        render={
          <Button
            size={"sm"}
            variant="secondary"
            className="gap-1 font-normal transition-colors duration-300"
          />
        }
      >
        Explore
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "rotate-x-180" : "rotate-x-0"
          )}
        />
      </MenuTrigger>
      <MenuPopup className={"max-w-fit rounded-2xl"}>
        <MenuGroup>
          {productItems.map((item) => (
            <MenuItem
              onClick={() => router.push(item.href)}
              className={"text-text-muted rounded-2xl pl-4"}
            >
              {item.icon}
              {item.label}
            </MenuItem>
          ))}
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}
