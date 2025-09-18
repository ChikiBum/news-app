const LOCAL_STORAGE_USERS_KEY = import.meta.env.VITE_LOCAL_STORAGE_USERS_KEY;

import type { LoginRequest, User, Users } from "../../types";

export function getAllUsers() {
	const raw: string | null = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
	return raw ? (JSON.parse(raw) as Users) : [];
}

export function addUser(user: User) {
	const users: Users = getAllUsers();
	users.push(user);
	localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
}

export function findUser({ username, password }: LoginRequest) {
	const users = getAllUsers();
	return users.find((u) => u.username === username && u.password === password);
}

export function isUsernameTaken(username: User["username"]) {
	const users = getAllUsers();
	return users.some((u) => u.username === username);
}
