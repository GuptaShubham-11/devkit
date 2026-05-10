"use client;";

import { cn } from "@repo/ui";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "font-inter container mx-auto max-w-5xl xl:max-w-6xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Container };
