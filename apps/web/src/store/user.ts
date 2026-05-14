import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { User } from "@repo/shared";

type UserState = {
  user: User | null;
  setUser: (updater: Partial<User> | ((prev: User) => User)) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,

        setUser: (updater) =>
          set((state) => {
            const prev = state.user;

            const next =
              typeof updater === "function"
                ? updater(prev!)
                : {
                    ...prev!,
                    ...updater,
                  };

            return {
              user: next,
            };
          }),

        clearUser: () =>
          set({
            user: null,
          }),
      }),
      {
        name: "user-store",

        partialize: (state) => ({
          user: state.user,
        }),

        skipHydration: false,
      }
    )
  )
);

export const useUser = () => useUserStore((state) => state.user);
export const useSetUser = () => useUserStore((state) => state.setUser);
export const useClearUser = () => useUserStore((state) => state.clearUser);
