import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

import { useIsMobile } from "@repo/ui";

export function CreditUsageChart({
  data,
}: {
  data: {
    date: string;
    creditUsage: number;
  }[];
}) {
  const isMobile = useIsMobile();

  const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
    if (!active || !payload?.[0]) return null;
    const data = payload[0].value;

    return (
      <span className="bg-surface-primary rounded-2xl border border-t-[1.25px] p-2 text-sm">
        Usage: {data?.toString().padStart(2, "0")}
      </span>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 270 : 300}>
      <AreaChart
        margin={{
          top: 10,
          left: isMobile ? -20 : 0,
          right: 10,
          bottom: 0,
        }}
        data={data}
      >
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval="preserveStartEnd"
          fontSize={12}
          stroke="var(--color-text-muted)"
          padding={{ left: 20, right: 20 }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          width={30}
          fontSize={11}
          tickMargin={10}
          tickCount={4}
          domain={["dataMin", "dataMax"]}
          stroke="var(--color-text-muted)"
        />

        <defs>
          <linearGradient id="softGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />

        <Tooltip content={CustomTooltip} />

        <Area
          type="monotone"
          dataKey="creditUsage"
          stroke="#f43f5e"
          strokeWidth={2}
          fill="url(#softGradient)"
          style={{
            filter: "drop-shadow(0 0 6px rgba(244,63,94,0.3))",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
