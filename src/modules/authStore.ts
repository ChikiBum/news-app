import { create } from "zustand";
import type  { AuthState } from "../types"; 

export const useAuthStore =
	create<AuthState>((set) => ({
		token: null,
		user: null,
		setToken: (token) => set({ token }),
		setUser: (user) => set({ user }),
		logout: () => set({ token: null, user: null }),
	}));
