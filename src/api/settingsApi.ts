import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ViewType } from "../types";

export function useSavedViews() {
	return useQuery({
		queryKey: ["savedViews"],
		queryFn: async () => {
			const res = await fetch("/api/user-grid-settings");
			if (!res.ok) throw new Error("Failed to fetch saved views");
			return res.json();
		},
	});
}

export function useSaveViewMutation() {
	const queryClient = useQueryClient();
	return useMutation<any, Error, ViewType>({
		mutationFn: async (view) => {
			const res = await fetch("/api/user-grid-settings", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(view),
			});
			if (!res.ok) throw new Error("Failed to save view");
			return res.json();
		},
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["savedViews"] }),
	});
}

export function useDeleteViewMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			const res = await fetch(`/api/user-grid-settings/${id}`, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Failed to delete view");
			return res.json();
		},
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["savedViews"] }),
	});
}
