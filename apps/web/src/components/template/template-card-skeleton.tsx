"use client";

import { Card, CardContent, CardFooter, CardHeader, Skeleton } from "@repo/ui";

export const TemplateCardSkeleton = () => {
  return (
    <Card className="font-inter group bg-surface-primary relative w-xs pb-0">
      <CardHeader className="flex items-start justify-between gap-2">
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-3/4 rounded-[6px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-10 rounded-[6px]" />
            <Skeleton className="h-3 w-8 rounded-[6px]" />
          </div>
        </div>
        <Skeleton className="size-6 rounded-xl" />
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-full rounded-[6px]" />
          <Skeleton className="h-3 w-5/6 rounded-[6px]" />
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-14 rounded-md" />
          <Skeleton className="h-6 w-14 rounded-md" />
          <Skeleton className="h-6 w-18 rounded-md" />
          <Skeleton className="h-6 w-12 rounded-md" />
          <Skeleton className="h-6 w-10 rounded-md" />
          <Skeleton className="h-6 w-7 rounded-md" />
        </div>
      </CardContent>

      <CardFooter className="bg-surface-secondary flex w-full items-center justify-between rounded-b-2xl border border-b-0 p-3">
        <div className="flex gap-1">
          <Skeleton className="size-6 rounded-[10px]" />
          <Skeleton className="size-6 rounded-[10px]" />
          <Skeleton className="size-6 rounded-[10px]" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-10 rounded-md" />
          <Skeleton className="h-4 w-10 rounded-md" />
        </div>
      </CardFooter>

      <div className="bg-surface-secondary absolute inset-x-0 bottom-0 flex translate-y-[110%] gap-2 rounded-b-2xl border-t p-3 opacity-0">
        <Skeleton className="h-8 flex-1 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </Card>
  );
};
