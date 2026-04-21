import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Query = {
  limit: number;
  offset: number;
  search?: string;
  sort?:
    | "slug"
    | "createdAt"
    | "updatedAt"
    | "views"
    | "copies"
    | "downloads"
    | "popular"
    | "trending";
  order?: "asc" | "desc";

  isPro?: boolean;
  isFeatured?: boolean;
  isSponsored?: boolean;
  isPublished?: boolean;
  isDeleted?: boolean;
};

type TemplateState = {
  query: Query;

  setQuery: (updater: Partial<Query> | ((prev: Query) => Query)) => void;

  resetQuery: () => void;
};

const defaultQuery: Query = {
  limit: 10,
  offset: 0,
  search: undefined,
  sort: "createdAt",
  order: "desc",
  isPublished: true,
  isDeleted: false,
};

export const useTemplateStore = create<TemplateState>()(
  devtools(
    persist(
      (set, get) => ({
        query: defaultQuery,

        setQuery: (updater) =>
          set((state) => {
            const prev = state.query;

            const next =
              typeof updater === "function"
                ? updater(prev)
                : { ...prev, ...updater };

            const shouldResetOffset =
              prev.search !== next.search ||
              prev.sort !== next.sort ||
              prev.order !== next.order ||
              prev.isPro !== next.isPro ||
              prev.isFeatured !== next.isFeatured ||
              prev.isSponsored !== next.isSponsored ||
              prev.isPublished !== next.isPublished;

            const finalQuery = {
              ...next,
              offset: shouldResetOffset ? 0 : next.offset,
            };

            return {
              query: { ...finalQuery },
            };
          }),

        resetQuery: () =>
          set({
            query: { ...defaultQuery },
          }),
      }),
      {
        name: "template-store",

        partialize: (state) => ({
          query: state.query,
        }),

        skipHydration: false,
      }
    )
  )
);

export const useQuery = () => useTemplateStore((state) => state.query);

export const useSetQuery = () => useTemplateStore((state) => state.setQuery);

export const useResetQuery = () =>
  useTemplateStore((state) => state.resetQuery);
