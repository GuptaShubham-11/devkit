import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Query = {
  limit: number;
  offset: number;
  search?: string;
  sort?: "duration" | "createdAt" | "installedAt";
  userId?: string;
  templateId?: string;
  order?: "asc" | "desc";
};

type InstallState = {
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
};

export const useInstallStore = create<InstallState>()(
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
              prev.userId !== next.userId ||
              prev.templateId !== next.templateId;

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
        name: "install-store",

        partialize: (state) => ({
          query: state.query,
        }),

        skipHydration: false,
      }
    )
  )
);

export const useInstallQuery = () => useInstallStore((state) => state.query);

export const useSetQuery = () => useInstallStore((state) => state.setQuery);

export const useResetQuery = () => useInstallStore((state) => state.resetQuery);
