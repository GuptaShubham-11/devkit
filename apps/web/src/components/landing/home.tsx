"use client";

import { Container } from "../core/container";
import { BentoGrid } from "./bento-grid";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Pricing } from "./pricing";
import { SponsoredRail } from "./sponsore-rail";
import { WallOfLove } from "./wall-of-love";

export const Home = () => {
  return (
    <Container className="relative flex min-h-screen flex-col sm:px-0">
      <Header />
      <Hero />
      <BentoGrid />
      <WallOfLove />
      <Pricing />
      {/* <div
                className="
        relative 
        border
        mt-6
        w-full
        overflow-hidden
        rotate-2
        bg-accent-success
        mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]
    "
            >
                <motion.div
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        duration: 50,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="
            flex
            w-max
            items-center
            whitespace-nowrap
        "
                >
                    {[...Array(2)].map((_, loopIndex) => (
                        <div
                            key={loopIndex}
                            className="
                    flex
                    shrink-0
                    items-center
                    gap-12
                    pr-12
                "
                        >
                            {Array.from({ length: 3 }).map((_, i) => (
                                <p
                                    key={i}
                                    className="
                            shrink-0
                            text-base
                            font-medium
                            tracking-tight
                            text-text-primary
                            sm:text-sm
                            md:text-lg
                            xl:text-xl
                        "
                                >
                                    Build faster with production ready modules,
                                    scalable architecture, and complete SaaS starter templates.
                                </p>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div> */}
      <SponsoredRail />
      <Footer />
    </Container>
  );
};
