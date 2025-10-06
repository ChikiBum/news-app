import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { SavedView, ViewType } from "../types";
import { makeAuthenticatedRequest } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

const localApiUrl = (type: "get" | "post" | "delete" | "update" | "save") =>
	`${BACKEND_URL}/settings/${type}-user-grid-settings`;

export function useSavedViews() {
	return useQuery<SavedView[]>({
		queryKey: ["savedViews"],
		queryFn: async () => {
			const result = await makeAuthenticatedRequest(localApiUrl("get"));
			return Array.isArray(result.settings) ? result.settings : [];
		},
	});
}

export function useSaveViewMutation() {
	const queryClient = useQueryClient();
	return useMutation<ViewType, Error, ViewType>({
		mutationFn: (view) =>
			makeAuthenticatedRequest(localApiUrl("save"), {
				method: "POST",
				body: JSON.stringify(view),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["savedViews"] }),
	});
}

export function useDeleteViewMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) =>
			makeAuthenticatedRequest(`${localApiUrl("delete")}/${id}`, {
				method: "DELETE",
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["savedViews"] }),
	});
}
