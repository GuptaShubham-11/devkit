import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Query = {
  limit: number;
  offset: number;
};

type BillState = {
  query: Query;
  setQuery: (updater: Partial<Query> | ((prev: Query) => Query)) => void;
  resetQuery: () => void;
};

const defaultQuery: Query = {
  limit: 10,
  offset: 0,
};

export const useBillStore = create<BillState>()(
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

            const finalQuery = {
              ...next,
              offset: next.offset,
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
        name: "Bill-store",

        partialize: (state) => ({
          query: state.query,
        }),

        skipHydration: false,
      }
    )
  )
);

export const useBillQuery = () => useBillStore((state) => state.query);

export const useSetQuery = () => useBillStore((state) => state.setQuery);

export const useResetQuery = () => useBillStore((state) => state.resetQuery);
