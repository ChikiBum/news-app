import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ParseFeedRequest, ParseFeedResponse } from "../types";
import { makeAuthenticatedRequest } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

export async function parseFeed(
	data: ParseFeedRequest,
): Promise<ParseFeedResponse> {
	return makeAuthenticatedRequest(`${BACKEND_URL}/feed/parse`, {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export function useParseFeedMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: parseFeed,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["news"] });
		},
	});
}
