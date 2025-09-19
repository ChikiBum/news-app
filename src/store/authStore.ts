import { create } from "zustand";
import { login as mockLogin, register as mockRegister } from "../api/mockApi";
import type { AuthState, User } from "../types";

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	token: null,
	user: null,
	setToken: (token) =>
		set({
			token,
			isAuthenticated: !!token,
		}),
	setUser: (user) => set({ user }),
	login: async (email: string, password: string) => {
		const user = await mockLogin(email, password);
		set({
			user,
			token: "mock-token",
			isAuthenticated: true,
		});
	},
	register: async (userData: Omit<User, "id">) => {
			const user = await mockRegister(userData);
			set({
				user,
				token: "mock-token",
				isAuthenticated: true,
			});
	},
	logout: () =>
		set({
			token: null,
			user: null,
			isAuthenticated: false,
		}),
}));
