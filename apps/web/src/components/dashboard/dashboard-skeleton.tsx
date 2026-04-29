import {
  Card,
  CardFrame,
  CardFrameHeader,
  CardPanel,
  Skeleton,
} from "@repo/ui";

import { Container } from "../core/container";
import { TemplateCardSkeleton } from "../template/template-card-skeleton";

export const DashboardSkeleton = () => {
  return (
    <Container className="mt-20 mb-20 grid items-center gap-6 px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface-primary space-y-3 rounded-2xl border p-4 sm:p-6"
          >
            <Skeleton className="bg-surface-secondary h-3 w-24 rounded-xl" />
            <Skeleton className="bg-surface-secondary h-6 w-32 rounded-xl" />
          </div>
        ))}
      </div>

      <CardFrame>
        <CardFrameHeader>
          <Skeleton className="bg-surface-secondary h-5 w-40 rounded-xl" />
          <Skeleton className="bg-surface-secondary mt-2 h-3 w-56 rounded-xl" />
        </CardFrameHeader>

        <Card>
          <CardPanel>
            <Skeleton className="bg-surface-secondary h-[250px] w-full rounded-xl" />
          </CardPanel>
        </Card>
      </CardFrame>

      <div className="bg-surface-primary rounded-2xl border p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            className="bg-surface-secondary mb-2 h-8 w-full rounded-xl"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <TemplateCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
};
