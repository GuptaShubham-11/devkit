"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { shallow } from "zustand/shallow";

import { Template } from "@repo/shared";

import { convertQueryToString } from "@/lib/convert-query-to-string";
import { http } from "@/lib/http";
import { useQuery as useTemplateQuery } from "@/store/template";

import { Container } from "../core/container";
import { PaginationTemplate } from "./pagination-template";
import { TemplateCard } from "./template-card";
import { TemplateCardSkeleton } from "./template-card-skeleton";

export const GridTemplate = () => {
  const query = useTemplateQuery();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["templates", query],

    queryFn: async ({ queryKey }) => {
      const [, q] = queryKey;
      const qs = convertQueryToString(q as typeof query);

      const res = await http.get(`/templates?${qs}`);
      return res.data;
    },

    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const templates = data?.templates || [];
  const pagination = data?.pagination;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <TemplateCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <Container className="mb-20 grid justify-center gap-6">
      <PaginationTemplate pagination={pagination} />

      <div
        className={`grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 sm:px-6 md:grid-cols-3 ${
          isFetching ? "opacity-60" : "opacity-100"
        }`}
      >
        {templates.map((template: Template) => (
          <TemplateCard key={template._id} template={template} />
        ))}
      </div>

      <PaginationTemplate pagination={pagination} />
    </Container>
  );
};
