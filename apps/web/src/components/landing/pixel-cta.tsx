"use client";

import { useEffect, useRef } from "react";

const WORDS = ["BUILD", "LAUNCH", "SHIP", "PRODUCT"];

const GRID_SIZE = 8;
const PARTICLE_SIZE = 5;

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
};

export function PixelCTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    let animationFrame: number;
    let currentWord = 0;

    const particles: Particle[] = [];

    const resize = () => {
      width = canvas.parentElement?.clientWidth ?? 1200;
      height = 300;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();

    window.addEventListener("resize", resize);

    function getTextPixels(text: string) {
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");

      if (!offCtx) return [];

      offscreen.width = width;
      offscreen.height = height;

      offCtx.clearRect(0, 0, width, height);

      offCtx.fillStyle = "#fff";
      offCtx.font = "900 120px Inter";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      offCtx.fillText(text, width / 2, height / 2);

      const data = offCtx.getImageData(0, 0, width, height);

      const points = [];

      for (let y = 0; y < height; y += GRID_SIZE) {
        for (let x = 0; x < width; x += GRID_SIZE) {
          const alpha = data.data[(y * width + x) * 4 + 3];

          if (alpha > 100) {
            points.push({
              x,
              y,
            });
          }
        }
      }

      return points;
    }

    function morphToWord(word: string) {
      const targets = getTextPixels(word);

      while (particles.length < targets.length) {
        particles.push({
          x: width / 2,
          y: height / 2,
          tx: width / 2,
          ty: height / 2,
        });
      }

      targets.forEach((target, index) => {
        particles[index].tx = target.x;
        particles[index].ty = target.y;
      });

      for (let i = targets.length; i < particles.length; i++) {
        particles[i].tx = width / 2;
        particles[i].ty = height / 2;
      }
    }

    morphToWord(WORDS[0]);

    const interval = setInterval(() => {
      currentWord = (currentWord + 1) % WORDS.length;

      morphToWord(WORDS[currentWord]);
    }, 3000);

    function render(time: number) {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      const beamX = ((time * 0.12) % (width + 300)) - 150;

      particles.forEach((particle, index) => {
        particle.x += (particle.tx - particle.x) * 0.08;

        particle.y += (particle.ty - particle.y) * 0.08;

        const float = Math.sin(time * 0.001 + index * 0.2) * 0.4;

        ctx.shadowBlur = 14;
        ctx.shadowColor = "rgba(255,255,255,0.6)";

        ctx.fillStyle = "rgba(255,255,255,0.9)";

        ctx.fillRect(
          particle.x,
          particle.y + float,
          PARTICLE_SIZE,
          PARTICLE_SIZE
        );
      });

      const gradient = ctx.createLinearGradient(beamX, 0, beamX + 180, 0);

      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.5, "rgba(255,255,255,0.08)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;

      ctx.fillRect(beamX, 0, 180, height);

      animationFrame = requestAnimationFrame(render);
    }

    animationFrame = requestAnimationFrame(render);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl">
        <canvas ref={canvasRef} className="w-full" />
      </div>
    </section>
  );
}
