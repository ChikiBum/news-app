import Cookies from "js-cookie";
import type { NewsItem } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
const API_PORT = import.meta.env.VITE_API_PORT;

export async function fetchAllNews(): Promise<NewsItem[]> {
	const token = Cookies.get("token");
	if (!token) throw new Error("No auth token found");

	const res = await fetch(`${API_URL}:${API_PORT}/news/all`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || "Failed to fetch news");
	}

	const data = await res.json();
	return data.news;
}
