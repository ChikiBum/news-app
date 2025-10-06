import { useQuery } from "@tanstack/react-query";
import type { GridSettings } from "../types";
import { makeAuthenticatedRequest } from "../utils/auth";

export function useGridData(settings: GridSettings) {
	const BACKEND_URL =
		import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";
	const { page, pageSize, filters, sort } = settings;
	const backendSort = Array.isArray(sort) ? sort[0] : sort;
	const payload = { page, pageSize, filters, sort: backendSort };

	return useQuery({
		queryKey: ["gridData", settings],
		queryFn: () =>
			makeAuthenticatedRequest(`${BACKEND_URL}/statistics/grid`, {
				method: "POST",
				body: JSON.stringify(payload),
			}),
	});
}
