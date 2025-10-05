import Cookies from "js-cookie";

const getAuthToken = (): string => {
	const token = Cookies.get("token");
	if (!token) throw new Error("No auth token found");
	return token;
};

const getAuthHeaders = () => ({
	Authorization: `Bearer ${getAuthToken()}`,
	"Content-Type": "application/json",
});

export const makeAuthenticatedRequest = async (
	url: string,
	options: RequestInit = {},
) => {
	const res = await fetch(url, {
		...options,
		headers: {
			...getAuthHeaders(),
			...options.headers,
		},
	});
	if (!res.ok) throw new Error(`Request failed: ${res.statusText}`);
	return res.json();
};
