import { motion } from "framer-motion";
import { BadgeCheckIcon, WindIcon } from "lucide-react";

import { Container } from "../core/container";
import { SponsoredLogo } from "../template/sponserd-logo";

const sponsors = [
  {
    name: "OpenAI",
    logo: "https://openai.com/favicon.ico",
  },
  {
    name: "Vercel",
    logo: "https://vercel.com/favicon.ico",
  },
  {
    name: "ImageKit",
    logo: "https://imagekit.io/favicon.ico",
  },
  {
    name: "Clerk",
    logo: "https://avatars.githubusercontent.com/u/49538337?s=200&v=4",
  },
  {
    name: "Next.js",
    logo: "https://nextjs.org/favicon.ico",
  },
  {
    name: "TailwindCSS",
    logo: "https://tailwindcss.com/favicon.ico",
  },
  {
    name: "Prisma",
    logo: "https://prisma.io/favicon.ico",
  },
  {
    name: "Stripe",
    logo: "https://stripe.com/favicon.ico",
  },
  {
    name: "Planetscale",
    logo: "https://planetscale.com/favicon.ico",
  },
  {
    name: "Railway",
    logo: "https://railway.app/favicon.ico",
  },
];

export const SponsoredRail = () => {
  return (
    <Container className="font-inter flex flex-col items-center justify-center overflow-hidden py-6 md:py-12">
      <span className="text-foreground flex items-center gap-2 rounded-full border-y px-4 py-2 text-xs font-medium tracking-wide text-shadow-2xs">
        <WindIcon className="size-4 text-blue-500" />
        Wall of sponsor
      </span>

      {/* heading */}
      <div className="mt-4 flex max-w-4xl flex-col items-center justify-center text-center">
        <h2 className="text-foreground text-3xl leading-none font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Backed by
        </h2>

        <p className="text-foreground mt-4 bg-blue-500 px-4 py-0.5 text-sm font-medium tracking-tight">
          Special Thanks for sponsoring this product.
        </p>
      </div>

      {/* sponsors */}
      <div className="relative mt-12 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 p-2">
        {sponsors.map((sponsor) => (
          <motion.div
            key={sponsor.name}
            transition={{ duration: 0.2 }}
            className="group flex items-center justify-center border-y"
          >
            <SponsoredLogo
              logoUrl={sponsor.logo}
              websiteUrl="#"
              size={24}
              sponsoredName={sponsor.name}
            />
          </motion.div>
        ))}
      </div>
    </Container>
  );
};
