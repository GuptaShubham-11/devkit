"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@repo/ui";

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
  return (
    <Link href={websiteUrl}>
      <Image
        src={`${logoUrl}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_KEY}&size=${size}&retina=true`}
        alt={sponsoredName}
        width={size}
        height={size}
        priority
        className={cn("rounded-md")}
      />
    </Link>
  );
};

export { SponsoredLogo };
