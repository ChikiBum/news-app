import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
const API_PORT = import.meta.env.VITE_API_PORT;


export async function register({ username, email, password }: RegisterRequest): Promise<RegisterResponse & { token: string }> {
    const res = await fetch(`${API_URL}:${API_PORT}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return await res.json();
}

export async function login({ email, password }: LoginRequest): Promise<LoginResponse & { token: string }> {
  console.log(' route/auth/login ', `${API_URL}:${API_PORT}/auth/login`);
  const res = await fetch(`${API_URL}:${API_PORT}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return await res.json();
}