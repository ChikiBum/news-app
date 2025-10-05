import { useQuery } from "@tanstack/react-query";
import type { GridSettings } from "../types";

export function useGridData(settings: GridSettings) {
	return useQuery({
		queryKey: ["gridData", settings],
		queryFn: async () => {
			const res = await fetch("/api/event/grid", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(settings),
			});
			if (!res.ok) throw new Error("Failed to fetch grid data");
			return res.json();
		},
	});
}
