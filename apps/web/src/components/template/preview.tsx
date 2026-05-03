"use client";

import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { ImageIcon, RouteIcon } from "lucide-react";

import {
  Button,
  Dialog,
  DialogPopup,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  ScrollArea,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@repo/ui";

export function Preview({
  imageUrl,
  videoUrl,
}: {
  imageUrl?: string;
  videoUrl?: string;
}) {
  const defaultTab = imageUrl ? "img" : "video";
  const [active, setActive] = useState<"img" | "video">(defaultTab);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState<"img" | "video">("img");

  // canvas states
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const velocity = useRef({ x: 0, y: 0 });

  const MIN = 0.75;
  const MAX = 3.5;

  // zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const delta = -e.deltaY * 0.0015;
    const next = Math.min(MAX, Math.max(MIN, scale + delta));

    setScale(next);

    if (next === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // drag
  const handleDrag = (_: any, info: any) => {
    velocity.current = {
      x: info.velocity.x * 0.03,
      y: info.velocity.y * 0.03,
    };

    setPosition((prev) => ({
      x: prev.x + info.delta.x,
      y: prev.y + info.delta.y,
    }));
  };

  // inertia
  const handleDragEnd = () => {
    const decay = () => {
      velocity.current.x *= 0.92;
      velocity.current.y *= 0.92;

      setPosition((prev) => ({
        x: prev.x + velocity.current.x,
        y: prev.y + velocity.current.y,
      }));

      if (
        Math.abs(velocity.current.x) > 0.2 ||
        Math.abs(velocity.current.y) > 0.2
      ) {
        requestAnimationFrame(decay);
      }
    };

    requestAnimationFrame(decay);
  };

  useEffect(() => {
    if (!previewOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [previewOpen]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <Tabs value={active} onValueChange={(v) => setActive(v as any)}>
          <TabsList className="mx-auto [--radius:9999px]">
            <TabsTab value="img">Image</TabsTab>
            <TabsTab value="video">Video</TabsTab>
          </TabsList>

          <TabsPanel value="img">
            {imageUrl ? (
              <ScrollArea className="h-80">
                <motion.div
                  className="bg-bg-secondary relative cursor-zoom-in overflow-hidden rounded-xl"
                  onClick={() => {
                    setPreviewType("img");
                    setPreviewOpen(true);
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="preview"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <div className="absolute top-2 right-2">
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => {
                        setPreviewType("img");
                        setPreviewOpen(true);
                      }}
                    >
                      Open
                    </Button>
                  </div>
                </motion.div>
              </ScrollArea>
            ) : (
              <EmptyState label="image" icon={<ImageIcon />} />
            )}
          </TabsPanel>

          <TabsPanel value="video">
            {videoUrl ? (
              <div className="bg-bg-secondary relative overflow-hidden rounded-xl">
                <iframe
                  src={videoUrl}
                  className="h-[320px] w-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />

                <div className="absolute top-2 right-2">
                  <Button
                    size="xs"
                    variant="secondary"
                    onClick={() => {
                      setPreviewType("video");
                      setPreviewOpen(true);
                    }}
                  >
                    Open
                  </Button>
                </div>
              </div>
            ) : (
              <EmptyState label="video" icon={<RouteIcon />} />
            )}
          </TabsPanel>
        </Tabs>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogPopup className="bg-bg-primary min-w-4xl p-0">
          <div
            className="relative h-[80vh] w-full overflow-hidden"
            onWheel={previewType === "img" ? handleWheel : undefined}
          >
            {previewType === "img" && (
              <div className="absolute inset-0 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-size-[20px_20px] opacity-[0.1]" />
            )}

            {/* IMAGE */}
            {previewType === "img" && imageUrl && (
              <motion.img
                src={imageUrl}
                drag={scale > 0.6}
                dragMomentum={false}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                style={{
                  scale,
                  x: position.x,
                  y: position.y,
                }}
                className="max-h-full max-w-full cursor-grab select-none active:cursor-grabbing"
              />
            )}

            {previewType === "video" && videoUrl && (
              <iframe
                src={videoUrl}
                className="h-full w-full rounded-2xl object-cover"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}

            {previewType === "img" && (
              <div className="text-text-muted pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 text-xs">
                scroll to zoom • drag to move
              </div>
            )}
          </div>
        </DialogPopup>
      </Dialog>
    </>
  );
}

function EmptyState({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>No {label} available</EmptyTitle>
        <EmptyDescription>Nothing to preview</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button disabled size="sm">
          Coming Soon
        </Button>
      </EmptyContent>
    </Empty>
  );
}
