import type { GetNewsFilters, LoginRequest, NewsFeed, NewsRequest, RegisterRequest } from "../../types";
import { addUser, findUser, isUsernameTaken } from "./userStorage";

export function login({ username, password }: LoginRequest) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const user = findUser(username, password);
			if (user) {
				const token = btoa(
					JSON.stringify({
						id: user.id,
						username: user.username,
						name: user.username,
						exp: Date.now() + 3600_000,
					}),
				);
				resolve({ token });
			} else {
				reject({
					message: "Користувача не знайдено. Ви можете зареєструватися!",
				});
			}
		}, 700);
	});
}

export function register({ username, email, password,  }: RegisterRequest) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (isUsernameTaken(username)) {
				reject({ message: "Такий логін вже зайнятий" });
				return;
			}
			const newUser = {
				id: Date.now(),
				username,
				password,
				email,
			};
			addUser(newUser);
			const token = btoa(
				JSON.stringify({
					id: newUser.id,
					username: newUser.username,
					email: newUser.email,
					exp: Date.now() + 3600_000,
				}),
			);
			resolve({ token });
		}, 700);
	});
}


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
