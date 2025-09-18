import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";

type UserState = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: true,
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage", 
    }
  )
);
