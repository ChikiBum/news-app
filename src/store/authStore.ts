import Cookies from "js-cookie";
import { create } from "zustand";
import { login as apiLogin, register as apiRegister } from "../api/authApi";
import type { AuthState, LoginRequest, RegisterRequest } from "../types";

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	user: null,

	setToken: (token) =>
		set({
			isAuthenticated: !!token,
		}),

	setUser: (user) => set({ user }),

	login: async (credentials: LoginRequest) => {
		const data = await apiLogin(credentials);
		return data;
	},

	register: async (userData: RegisterRequest) => {
		const data = await apiRegister(userData);
		return data;
	},

	logout: () => {
		Cookies.remove("token");
		set({
			user: null,
			isAuthenticated: false,
		});
	},
}));
