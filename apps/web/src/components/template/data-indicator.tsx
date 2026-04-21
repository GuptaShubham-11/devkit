const indicatorConfig = [
  {
    key: "isPro",
    label: "Pro",
    short: "P",
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  {
    key: "isFeatured",
    label: "Featured",
    short: "F",
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  {
    key: "isSponsored",
    label: "Sponsored",
    short: "S",
    className: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
  {
    key: "isPublished",
    label: "Live",
    short: "L",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    key: "isDeleted",
    label: "Deleted",
    short: "D",
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
];

export const DataIndicator = (props: {
  isPublished?: boolean;
  isFeatured?: boolean;
  isSponsored?: boolean;
  isDeleted?: boolean;
  isPro?: boolean;
}) => {
  const activeIndicators = indicatorConfig.filter(
    (item) => props[item.key as keyof typeof props]
  );

  if (activeIndicators.length === 0) return null;

  return (
    <div className="flex -space-x-1">
      {activeIndicators.map((item) => (
        <div
          key={item.key}
          title={item.label}
          className={`ring-surface-primary flex size-6 items-center justify-center rounded-[10px] border text-xs font-medium ring-1 transition hover:scale-105 ${item.className} `}
        >
          {item.short}
        </div>
      ))}
    </div>
  );
};
