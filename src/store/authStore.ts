import { create } from "zustand";
import type { AuthState, User } from "../types";
import { login as mockLogin, register as mockRegister } from "../api/mockApi";

export const useAuthStore =
	create<AuthState>((set) => ({
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
		try {
			const user = await mockLogin(email, password);
			set({ 
				user,
				token: 'mock-token',
				isAuthenticated: true 
			});
		} catch (error) {
			throw error;
		}
	},
	register: async (userData: Omit<User, 'id'>) => {
		try {
			const user = await mockRegister(userData);
			set({
				user,
				token: 'mock-token',
				isAuthenticated: true
			});
		} catch (error) {
			throw error;
		}
	},
	logout: () =>
			set({
				token: null,
				user: null,
				isAuthenticated: false,
			})
	}));
