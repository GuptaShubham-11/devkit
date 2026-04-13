"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@repo/ui";

type LogoProps = {
  size?: number;
};

export const Logo = ({ size = 32 }: LogoProps) => {
  return (
    <Link href="/" aria-label="Go to homepage">
      <Image
        src="/logo.svg"
        alt="Devkit"
        width={size}
        height={size}
        priority
        className={cn("rounded-md")}
      />
    </Link>
  );
};
