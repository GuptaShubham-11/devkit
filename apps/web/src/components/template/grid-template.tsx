"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Template } from "@repo/shared";

import { convertQueryToString } from "@/lib/convert-query-to-string";
import { http } from "@/lib/http";
import { useQuery as useTemplateQuery } from "@/store/template";

import { Container } from "../core/container";
import { PaginationTemplate } from "./pagination-template";
import { TemplateCard } from "./template-card";
import { TemplateCardSkeleton } from "./template-card-skeleton";

// import { templateData } from "@/mock-data/template-data";  // mock templates data

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
      <div className="grid gap-4">
        <h3 className="text-text-secondary relative text-2xl font-semibold">
          <div className="bg-accent-primary absolute -left-2 -z-10 h-8 w-35 -rotate-1 opacity-70" />
          Templates
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-6 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <TemplateCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Container className="mb-10 grid justify-center gap-6 sm:mb-20">
      <div className="grid gap-4">
        <h3 className="text-text-secondary relative text-2xl font-semibold">
          <div className="bg-accent-primary absolute -left-2 -z-10 h-8 w-35 -rotate-1 opacity-70" />
          Templates
        </h3>
        <div
          className={`grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 sm:px-6 md:grid-cols-3 ${
            isFetching ? "pointer-events-none opacity-60" : ""
          }`}
        >
          {templates.map((template: Template) => (
            <TemplateCard key={template._id} template={template} />
          ))}
        </div>
      </div>

      <PaginationTemplate pagination={pagination} />
    </Container>
  );
};
