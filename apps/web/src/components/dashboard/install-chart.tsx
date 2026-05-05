import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useIsMobile } from "@repo/ui";

export function InstallsChart({
  data,
}: {
  data: {
    date: string;
    installs: number;
  }[];
}) {
  const isMobile = useIsMobile();

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.[0]) return null;
    const data = payload[0].value;

    return (
      <span className="bg-surface-primary rounded-2xl border border-t-[1.25px] p-2 text-sm">
        Installs: {data?.toString().padStart(2, "0")}
      </span>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 270 : 300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          left: isMobile ? -20 : 0,
          right: 10,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="installGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#16a34a" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />

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

        <Tooltip
          content={CustomTooltip}
          cursor={{
            stroke: "rgba(255,255,255,0.15)",
            strokeWidth: 1,
          }}
        />

        <Area
          type="monotone"
          dataKey="installs"
          stroke="#16a34a"
          strokeWidth={2}
          fill="url(#installGradient)"
          dot={false}
          activeDot={{
            r: 5,
            stroke: "#fff",
            strokeWidth: 2,
          }}
          style={{
            filter: "drop-shadow(0 0 6px rgba(22,163,74,0.35))",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
