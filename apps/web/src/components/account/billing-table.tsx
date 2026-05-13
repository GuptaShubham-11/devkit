"use client";

import { useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon } from "lucide-react";

import {
  Badge,
  Button,
  CardFrame,
  CardFrameFooter,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";

import { convertQueryToString } from "@/lib/convert-query-to-string";
import { formatDate } from "@/lib/formate-date";
import { http } from "@/lib/http";
import { useBillQuery, useSetQuery } from "@/store/bill";

import { TableSkeleton } from "../dashboard/table-skeleton";
import { EmptyBilling } from "./empty-billing";

type BillingItem = {
  _id: string;
  invoiceUrl?: string;
  amount: number;
  currency: string;
  status: string;
  creditsGranted: number;
  createdAt: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "succeeded":
      return "bg-emerald-500";

    case "failed":
      return "bg-red-500";

    default:
      return "bg-muted-foreground/64";
  }
};

const columns: ColumnDef<BillingItem>[] = [
  {
    accessorKey: "_id",
    header: "Payment ID",

    cell: ({ row }) => (
      <div className="text-text-muted font-mono text-xs">
        {(row.getValue("_id") as string).slice(-12)}
      </div>
    ),
  },

  {
    accessorKey: "amount",
    header: "Amount",

    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;

      const currency = row.original.currency;

      return (
        <span className="text-text-secondary">
          {(amount / 100).toFixed(2)} {currency.toUpperCase()}
        </span>
      );
    },
  },

  {
    accessorKey: "creditsGranted",
    header: "Credits",

    cell: ({ row }) => (
      <span className="text-text-primary text-sm font-medium">
        +{row.getValue("creditsGranted")}
      </span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge variant="outline">
          <span
            className={`size-1.5 rounded-full ${getStatusColor(status)} `}
          />

          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date",

    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));

      return <span className="text-text-secondary">{formatDate(date)}</span>;
    },
  },

  {
    accessorKey: "time",
    header: "Time",

    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);

      return (
        <span className="text-text-muted">
          {date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },

  {
    accessorKey: "invoiceUrl",
    header: "Invoice",

    cell: ({ row }) => {
      const invoiceUrl = row.original.invoiceUrl;

      if (!invoiceUrl) {
        return <span className="text-text-muted">—</span>;
      }

      return (
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.open(invoiceUrl, "_blank")}
        >
          <ExternalLinkIcon className="size-4" />
          View
        </Button>
      );
    },
  },
];

export function BillingTable() {
  const query = useBillQuery();

  const setQuery = useSetQuery();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["billing-history", query],

    queryFn: async ({ queryKey }) => {
      const [, q] = queryKey;
      const qs = convertQueryToString(q as typeof query);
      const res = await http.get(`/payment/billing?${qs}`);
      return res.data;
    },

    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const pageIndex = Math.floor(query.offset / query.limit);
  const [sorting, setSorting] = useState<SortingState>([
    {
      desc: true,
      id: "createdAt",
    },
  ]);

  const table = useReactTable({
    columns,
    data: items,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({
              pageIndex,
              pageSize: query.limit,
            })
          : updater;

      setQuery({
        ...query,

        offset: next.pageIndex * query.limit,
      });
    },

    onSortingChange: setSorting,

    state: {
      pagination: {
        pageIndex,

        pageSize: query.limit,
      },

      sorting,
    },

    manualPagination: true,

    pageCount: pagination?.totalPages ?? -1,
  });

  if (isLoading) return <TableSkeleton />;

  if (!items.length) return <EmptyBilling />;

  return (
    <CardFrame
      className={`bg-surface-primary ${
        isFetching ? "opacity-70" : "opacity-100"
      } `}
    >
      <Table variant="card" className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-transparent" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const columnSize = header.column.getSize();

                return (
                  <TableHead
                    key={header.id}
                    style={
                      columnSize
                        ? {
                            width: `${columnSize}px`,
                          }
                        : undefined
                    }
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className="flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();

                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {{
                          asc: (
                            <ChevronUpIcon
                              aria-hidden="true"
                              className="size-4 shrink-0 opacity-80"
                            />
                          ),

                          desc: (
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="size-4 shrink-0 opacity-80"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="in-data-[variant=card]:*:[tr]:*:[td]:bg-surface-primary in-data-[variant=card]:*:[tr]:first:*:[td]:border-t-[1.75px]">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() ? "selected" : undefined}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CardFrameFooter className="p-2">
        <div className="flex items-center justify-between gap-2">
          {/* range */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <p className="text-muted-foreground text-sm">Viewing</p>

            <Select
              items={Array.from(
                {
                  length: totalPages,
                },
                (_, i) => {
                  const start = i * query.limit + 1;

                  const end = Math.min(
                    (i + 1) * query.limit,

                    data?.pagination?.total ?? 0
                  );

                  return {
                    label: `${start}-${end}`,

                    value: i + 1,
                  };
                }
              )}
              onValueChange={(value) => {
                const page = value as number;

                setQuery({
                  ...query,

                  offset: (page - 1) * query.limit,
                });
              }}
              value={Math.floor(query.offset / query.limit) + 1}
            >
              <SelectTrigger
                aria-label="Select result range"
                className="min-w-none w-fit"
                size="sm"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectPopup>
                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, i) => {
                    const start = i * query.limit + 1;

                    const end = Math.min(
                      (i + 1) * query.limit,

                      pagination?.total ?? 0
                    );

                    const pageNum = i + 1;

                    return (
                      <SelectItem key={pageNum} value={pageNum}>
                        {`${start}-${end}`}
                      </SelectItem>
                    );
                  }
                )}
              </SelectPopup>
            </Select>

            <p className="text-muted-foreground text-sm">
              of{" "}
              <strong className="text-foreground font-medium">
                {pagination?.total ?? 0}
              </strong>{" "}
              results
            </p>
          </div>

          {/* pagination */}
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="sm:*:[svg]:hidden"
                  render={
                    <Button
                      disabled={query.offset === 0}
                      onClick={() => {
                        const prevOffset = Math.max(
                          0,

                          query.offset - query.limit
                        );

                        setQuery({
                          ...query,

                          offset: prevOffset,
                        });
                      }}
                      size="sm"
                      variant="outline"
                    />
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  className="sm:*:[svg]:hidden"
                  render={
                    <Button
                      disabled={
                        !pagination ||
                        query.offset + query.limit >= pagination.total
                      }
                      onClick={() => {
                        if (!pagination) return;

                        const nextOffset = query.offset + query.limit;

                        if (nextOffset >= pagination.total) return;

                        setQuery({
                          ...query,

                          offset: nextOffset,
                        });
                      }}
                      size="sm"
                      variant="outline"
                    />
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFrameFooter>
    </CardFrame>
  );
}
