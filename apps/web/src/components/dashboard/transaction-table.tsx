"use client";

import { useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon, PlaneTakeoffIcon } from "lucide-react";

import { Transaction } from "@repo/shared";
import {
  Badge,
  Button,
  CardFrame,
  CardFrameFooter,
  Checkbox,
  cn,
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
  Skeleton,
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
import { useSetQuery, useTransactionQuery } from "@/store/transaction";

import { TableSkeleton } from "./table-skeleton";

const getStatusColor = (type: Transaction["type"]) => {
  switch (type) {
    case "credit":
      return "bg-emerald-500";
    case "debit":
      return "bg-red-500";
    default:
      return "bg-muted-foreground/64";
  }
};

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "_id",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="text-muted-foreground font-mono text-xs">
        {(row.getValue("_id") as string).slice(-12)}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as Transaction["type"];

      return (
        <Badge variant="outline">
          <span className={`size-1.5 rounded-full ${getStatusColor(type)}`} />
          {type}
        </Badge>
      );
    },
  },

  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;

      return (
        <span className="font-medium">
          {amount.toString().padStart(2, "0")}
        </span>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <span className="text-muted-foreground w-full">
        {row.getValue("reason")}
      </span>
    ),
  },
  {
    accessorKey: "paymentId",
    header: "Payment ID",
    cell: ({ row }) => {
      const id = row.getValue("paymentId") as string;

      return id ? (
        <span className="font-mono text-xs">{id}</span>
      ) : (
        <span className="text-muted-foreground text-xs">—</span>
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
      const date = new Date(row.getValue("createdAt"));

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
];

export function TransactionTable() {
  const query = useTransactionQuery();
  const setQuery = useSetQuery();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["transactions", query],

    queryFn: async ({ queryKey }) => {
      const [, q] = queryKey;
      const qs = convertQueryToString(q as typeof query);
      const res = await http.get(`/transactions?${qs}`);
      return res.data;
    },

    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const transactions = data?.transactions ?? [];
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
    data: transactions,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize: query.limit })
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

  return (
    <CardFrame className="bg-surface-primary w-full">
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
                      columnSize ? { width: `${columnSize}px` } : undefined
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
          {/* Results range selector */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <p className="text-muted-foreground text-sm">Viewing</p>
            <Select
              items={Array.from({ length: totalPages }, (_, i) => {
                const start = i * query.limit + 1;
                const end = Math.min(
                  (i + 1) * query.limit,
                  data?.pagination?.total ?? 0
                );

                return {
                  label: `${start}-${end}`,
                  value: i + 1,
                };
              })}
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
                {Array.from({ length: totalPages }, (_, i) => {
                  const start = i * query.limit + 1;
                  const end = Math.min(
                    (i + 1) * query.limit,
                    data?.pagination?.total ?? 0
                  );

                  const pageNum = i + 1;

                  return (
                    <SelectItem key={pageNum} value={pageNum}>
                      {`${start}-${end}`}
                    </SelectItem>
                  );
                })}
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

          {/* Pagination */}
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
                        !data?.pagination ||
                        query.offset + query.limit >= data.pagination.total
                      }
                      onClick={() => {
                        if (!data?.pagination) return;

                        const nextOffset = query.offset + query.limit;

                        if (nextOffset >= data.pagination.total) return;

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
