"use client";

import { motion } from "framer-motion";

import { ScrollArea, Tabs, TabsList, TabsPanel, TabsTab } from "@repo/ui";

export function Preview({
  imageUrl,
  videoUrl,
}: {
  imageUrl?: string;
  videoUrl?: string;
}) {
  return (
    <Tabs defaultValue={imageUrl ? "img" : "video"}>
      <TabsList className="mx-auto mb-3 [--radius:9999px]">
        <TabsTab value="img" disabled={!imageUrl}>
          Image
        </TabsTab>
        <TabsTab value="video" disabled={!videoUrl}>
          Video
        </TabsTab>
      </TabsList>

      <TabsPanel value="img">
        {imageUrl ? (
          <ScrollArea className={"h-80"}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-bg-secondary h-fit w-full overflow-hidden rounded-xl"
            >
              <img
                src={imageUrl}
                alt="Template preview"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </ScrollArea>
        ) : (
          <EmptyState label="No image available" />
        )}
      </TabsPanel>

      <TabsPanel value="video">
        {videoUrl ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-secondary h-56 w-full overflow-hidden rounded-lg"
          >
            <iframe
              src={videoUrl}
              className="h-full w-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>
        ) : (
          <EmptyState label="No video available" />
        )}
      </TabsPanel>
    </Tabs>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-text-muted flex h-40 items-center justify-center rounded-lg border border-dashed text-xs">
      {label}
    </div>
  );
}
