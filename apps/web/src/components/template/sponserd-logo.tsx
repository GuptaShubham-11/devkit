"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@repo/ui";

import { secretVariables } from "@/lib/secret-variables";

interface SponsoredLogoProps {
  size?: number;
  logoUrl: string;
  websiteUrl: string;
  sponsoredName: string;
}

const SponsoredLogo = ({
  size = 32,
  logoUrl,
  websiteUrl,
  sponsoredName,
}: SponsoredLogoProps) => {
  const { NEXT_PUBLIC_LOGO_DEV_KEY } = secretVariables();

  const url = logoUrl.includes("img.logo.dev")
    ? `${logoUrl}?token=${NEXT_PUBLIC_LOGO_DEV_KEY}&size=${size}&retina=true`
    : logoUrl;

  return (
    <Link href={websiteUrl}>
      <div className="flex items-center justify-center gap-1">
        <img
          src={url}
          alt={sponsoredName}
          width={size}
          height={size}
          className={cn("bg-bg-primary rounded-2xl")}
        />
        <span className="text-text-secondary hover:text-text-muted text-base font-semibold">
          {sponsoredName}
        </span>
      </div>
    </Link>
  );
};

export { SponsoredLogo };
