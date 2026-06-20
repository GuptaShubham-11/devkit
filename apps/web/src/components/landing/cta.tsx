"use client";

import { useEffect, useRef } from "react";

import { useTheme } from "next-themes";

import { Container } from "../core/container";

const WORD_A = "PRODUCT";
const WORD_B = "SHIP FAST";

const COLS = 96;
const ROWS = 24;
const TOTAL = COLS * ROWS;

const PIXEL_SIZE = 8;
const GAP = 3;
const STEP = PIXEL_SIZE + GAP;

function generatePixels(text: string): boolean[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = COLS;
  canvas.height = ROWS;

  if (!ctx) {
    return Array(TOTAL).fill(false);
  }

  ctx.clearRect(0, 0, COLS, ROWS);

  ctx.fillStyle = "#ffffff";
  ctx.font = "120 18px Inter";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, COLS / 2, ROWS / 2);

  const imageData = ctx.getImageData(0, 0, COLS, ROWS);

  return Array.from(
    { length: TOTAL },
    (_, i) => imageData.data[i * 4 + 3] > 10
  );
}

export function CTA() {
  const { resolvedTheme } = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const animationRef = useRef<number>(0);

  const stateRef = useRef({
    current: Array(TOTAL).fill(false),
    target: Array(TOTAL).fill(false),
    startTime: 0,
    animating: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const PRODUCT = generatePixels(WORD_A);

    const SHIP_FAST = generatePixels(WORD_B);

    const state = stateRef.current;

    state.current = Array(TOTAL).fill(false);

    state.target = PRODUCT;

    const activeColor = resolvedTheme === "dark" ? "#ffffff" : "#000000";

    const inactiveColor =
      resolvedTheme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

    const distances = Array.from({ length: TOTAL }, (_, i) => {
      const row = Math.floor(i / COLS);

      const col = i % COLS;

      return Math.sqrt(
        Math.pow(col - COLS / 2, 2) + Math.pow(row - ROWS / 2, 2)
      );
    });

    const ease = (t: number) => 1 - Math.pow(1 - t, 5);

    const animateTo = (target: boolean[]) => {
      state.current = [...state.target];

      state.target = target;

      state.startTime = performance.now();

      state.animating = true;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      render();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();

      const duration = 1200;

      let finished = true;

      for (let i = 0; i < TOTAL; i++) {
        const row = Math.floor(i / COLS);

        const col = i % COLS;

        const delay = distances[i] * 25;

        const elapsed = now - state.startTime - delay;

        let progress = Math.max(0, Math.min(1, elapsed / duration));

        if (progress < 1) {
          finished = false;
        }

        progress = ease(progress);

        const from = state.current[i];

        const to = state.target[i];

        const startScale = from ? 1 : 0.45;

        const endScale = to ? 1 : 0.45;

        const scale = startScale + (endScale - startScale) * progress;

        const startOpacity = from ? 1 : 0.04;

        const endOpacity = to ? 1 : 0.04;

        const opacity = startOpacity + (endOpacity - startOpacity) * progress;

        ctx.globalAlpha = opacity;

        ctx.fillStyle = to ? activeColor : inactiveColor;

        const size = PIXEL_SIZE * scale;

        const x = col * STEP + (PIXEL_SIZE - size) / 2;

        const y = row * STEP + (PIXEL_SIZE - size) / 2;

        ctx.fillRect(x, y, size, size);
      }

      ctx.globalAlpha = 1;

      if (!finished) {
        animationRef.current = requestAnimationFrame(render);
      } else {
        state.animating = false;
      }
    };

    animateTo(PRODUCT);

    const container = canvas.parentElement;

    if (!container) return;

    const handleEnter = () => animateTo(SHIP_FAST);

    const handleLeave = () => animateTo(PRODUCT);

    container.addEventListener("mouseenter", handleEnter);

    container.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);

      container.removeEventListener("mouseenter", handleEnter);

      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [resolvedTheme]);

  return (
    <Container className="py-6 md:py-12">
      <div className="text-foreground cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={COLS * STEP - GAP}
          height={ROWS * STEP - GAP}
          className="block"
        />
      </div>
    </Container>
  );
}
