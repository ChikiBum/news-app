import Cookies from "js-cookie";

const getAuthToken = (): string => {
	const token = Cookies.get("token");
	if (!token) throw new Error("No auth token found");
	return token;
};

const getAuthHeaders = (hasBody = false) => {
	const headers: Record<string, string> = {
		Authorization: `Bearer ${getAuthToken()}`,
	};
	if (hasBody) {
		headers["Content-Type"] = "application/json";
	}
	return headers;
};

export const makeAuthenticatedRequest = async (
	url: string,
	options: RequestInit = {},
) => {
	const hasBody = Boolean(options.body);

	const res = await fetch(url, {
		...options,
		headers: {
			...getAuthHeaders(hasBody),
			...options.headers,
		},
	});

	if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
	return res.json();
};
