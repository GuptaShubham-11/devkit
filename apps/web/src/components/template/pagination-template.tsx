"use client";

import { useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui";

import { useQuery, useSetQuery } from "@/store/template";

export function PaginationTemplate({
  pagination,
}: {
  pagination?: {
    limit: number;
    offset: number;
    total: number;
    totalPages: number;
  };
}) {
  const query = useQuery();
  const setQuery = useSetQuery();

  if (!pagination) return null;

  const { totalPages, limit } = pagination;
  const currentPage = Math.floor(query.offset / limit) + 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setQuery((prev) => ({
      ...prev,
      offset: (newPage - 1) * limit,
    }));

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = useMemo(() => {
    const result: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) result.push(i);
    } else {
      result.push(1);

      if (currentPage > 3) result.push("ellipsis");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) result.push(i);

      if (currentPage < totalPages - 2) result.push("ellipsis");

      result.push(totalPages);
    }

    return result;
  }, [currentPage, totalPages]);

  return (
    <Pagination>
      <PaginationContent className="font-inter">
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {pages.map((p, i) => (
          <PaginationItem key={i}>
            {p === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(p);
                }}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
