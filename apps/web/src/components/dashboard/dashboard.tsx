import { useState } from "react";

import {
  BadgeIndianRupee,
  ChartNoAxesCombinedIcon,
  ClockCheckIcon,
  DownloadIcon,
  MousePointerClickIcon,
  PercentIcon,
  Tally5Icon,
} from "lucide-react";

import { Template } from "@repo/shared";
import {
  Card,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
  cn,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Separator,
  Switch,
} from "@repo/ui";

import { CreditUsageChart } from "@/components/dashboard/credits-usage-chart";
import { InstallsChart } from "@/components/dashboard/install-chart";

import { Container } from "../core/container";
import { TemplateCard } from "../template/template-card";
import { InstallTable } from "./install-table";
import { TransactionTable } from "./transaction-table";

export const Dashboard = ({
  overview,
  installData,
  creditUsageData,
  suggestions,
  isFetching,
}: {
  overview: {
    creditBalance: number;
    totalInstalls: number;
    successRate: number;
    avgDuration: number;
  };
  installData: {
    date: string;
    installs: number;
  }[];
  creditUsageData: {
    date: string;
    creditUsage: number;
  }[];
  suggestions: Template[];
  isFetching: boolean;
}) => {
  const [isUsage, setIsUsage] = useState(true);

  const hasData = isUsage ? creditUsageData.length > 0 : installData.length > 0;

  const formattedDuration = overview.avgDuration
    ? `${(overview.avgDuration / 1000).toFixed(2)}s`
    : "0s";

  const renderChart = () => {
    if (!hasData) return <EmptyState />;

    if (isUsage) {
      return <CreditUsageChart data={creditUsageData} />;
    }

    return <InstallsChart data={installData} />;
  };

  return (
    <Container
      className={cn(
        "mt-20 mb-20 grid items-center gap-6 px-4 sm:px-6",
        isFetching && "pointer-events-none opacity-60"
      )}
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <DataCard
          icon={<BadgeIndianRupee className="text-brand-primary size-7" />}
          title="Credit Balance"
          value={overview.creditBalance}
        />
        <DataCard
          icon={<Tally5Icon className="text-accent-primary size-7" />}
          title="Total Installs"
          value={overview.totalInstalls.toString().padStart(2, "0")}
        />
        <DataCard
          icon={<PercentIcon className="text-accent-warning size-7" />}
          title="Success Rate"
          value={`${overview.successRate}%`}
        />
        <DataCard
          icon={<ClockCheckIcon className="text-accent-success size-7" />}
          title="Average Duration"
          value={formattedDuration}
        />
      </div>

      <CardFrame className="w-full">
        <CardFrameHeader>
          <CardFrameTitle className="text-base sm:text-lg">
            Activity Analytics
          </CardFrameTitle>
          <CardFrameDescription>
            <span className="inline-block sm:visible">
              Last 10 active days —
            </span>{" "}
            {isUsage ? "Credits Usage" : "Installs"}
          </CardFrameDescription>
          <CardFrameAction>
            <div className="bg-surface-secondary flex items-center gap-2 rounded-2xl border border-t-[1.5px] p-2">
              <DownloadIcon size={18} className={`text-accent-success`} />
              <Separator orientation="vertical" className="hidden sm:block" />
              <div className="flex items-center gap-2">
                <Switch
                  checked={isUsage}
                  onCheckedChange={setIsUsage}
                  className="data-unchecked:bg-accent-success cursor-pointer data-checked:bg-rose-500"
                />
              </div>
              <Separator orientation="vertical" className="hidden sm:block" />
              <MousePointerClickIcon size={18} className="text-rose-500" />
            </div>
          </CardFrameAction>
        </CardFrameHeader>
        <Card>
          <CardPanel>{renderChart()}</CardPanel>
        </Card>
      </CardFrame>

      {hasData && (isUsage ? <TransactionTable /> : <InstallTable />)}

      {suggestions.length > 0 && (
        <div className="grid gap-2">
          <h3 className="text-text-secondary relative mb-4 text-xl font-semibold">
            <div className="bg-accent-primary absolute -top-0.5 -left-1 -z-10 h-8 w-55 -rotate-1 opacity-65" />
            Suggested Templates
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {suggestions.map((s) => (
              <TemplateCard key={s._id} template={s} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

const DataCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="bg-surface-primary grid items-center gap-2 rounded-2xl border border-t-[1.25px] p-4 sm:p-6">
      <span className="text-text-muted text-xs font-thin sm:text-sm">
        {title}
      </span>
      <span className="text-text-primary flex items-center gap-2 text-xl font-semibold sm:text-3xl">
        {icon}
        {value}
      </span>
    </div>
  );
};

const EmptyState = () => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <ChartNoAxesCombinedIcon />
      </EmptyMedia>
      <EmptyTitle>No Activity</EmptyTitle>
      <EmptyDescription>Get started by installing a template</EmptyDescription>
    </EmptyHeader>
  </Empty>
);
