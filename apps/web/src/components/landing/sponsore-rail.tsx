import { motion } from "framer-motion";
import { BadgeCheckIcon, WindIcon } from "lucide-react";

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
    <section className="font-inter relative flex flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-20">
      {/* badge */}
      <span className="border-surface-secondary text-text-secondary flex items-center gap-2 rounded-full border-y px-4 py-2 text-xs font-medium tracking-wide">
        <WindIcon className="text-accent-primary size-4" />
        Wall of sponsor
      </span>

      {/* heading */}
      <div className="mt-4 flex max-w-4xl flex-col items-center justify-center text-center">
        <h2 className="text-text-secondary text-3xl leading-none font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Backed by
        </h2>

        <p className="bg-accent-primary text-text-primary mt-5 px-4 py-1 text-sm font-medium tracking-tight">
          Thanks for sponsoring this product and making it possible.
        </p>
      </div>

      {/* sponsors */}
      <div className="relative mt-12 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-6 p-2">
        <div className="absolute inset-0 backdrop-blur-xs" />
        <div className="text-text-secondary absolute top-1/2 left-1/2 z-10 flex -rotate-20 items-center justify-center border px-2 py-2 text-xs font-medium tracking-wide uppercase backdrop-blur-md">
          <BadgeCheckIcon className="text-accent-success mr-2 size-4 stroke-2" />
          Coming Soon
        </div>
        {sponsors.map((sponsor) => (
          <motion.div
            key={sponsor.name}
            transition={{ duration: 0.2 }}
            className="group flex items-center justify-center"
          >
            <SponsoredLogo
              logoUrl={sponsor.logo}
              websiteUrl="#"
              sponsoredName={sponsor.name}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
