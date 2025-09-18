import type { GetNewsFilters, NewsFeed, NewsRequest } from "../types";

export function fetchNews(token: NewsRequest["token"], filters?: GetNewsFilters) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (!token) {
				reject({ message: "Неавторизовано" });
				return;
			}
			resolve([
				{ id: 1, title: "Новина 1", content: "Контент новини 1" },
				{ id: 2, title: "Новина 2", content: "Контент новини 2" },
			] as NewsFeed);
		}, 500);
	});
}
