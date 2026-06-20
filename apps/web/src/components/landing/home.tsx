"use client";

import { Container } from "../core/container";
import { BentoGrid } from "./bento-grid";
import { CTA } from "./cta";
import { Hero } from "./hero";
import { PixelCTA } from "./pixel-cta";
import { WallOfLove } from "./wall-of-love";

export const Home = () => {
  return (
    <Container className="flex min-h-screen flex-col">
      <Hero />
      <BentoGrid />
      <WallOfLove />
      <CTA />
    </Container>
  );
};
