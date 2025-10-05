import { create } from "zustand";
import type { GridSettings, GridSettingsState } from "../types";

const DEFAULT_GRID_SETTINGS: GridSettings = {
	filters: {},
	sort: [{ field: "createdAt", direction: "desc" }],
	page: 1,
	pageSize: 100,
	columns: ["id", "type", "adId", "anonId", "createdAt"],
	viewName: "Default",
} as const;

export const useGridSettings = create<GridSettingsState>((set) => ({
	settings: DEFAULT_GRID_SETTINGS,
	setFilters: (filters) =>
		set((state) => ({ settings: { ...state.settings, filters } })),
	setSort: (sort) =>
		set((state) => ({ settings: { ...state.settings, sort } })),
	setPage: (page) =>
		set((state) => ({ settings: { ...state.settings, page } })),
	setPageSize: (pageSize) =>
		set((state) => ({ settings: { ...state.settings, pageSize } })),
	setColumns: (columns) =>
		set((state) => ({ settings: { ...state.settings, columns } })),
	setViewName: (viewName) =>
		set((state) => ({ settings: { ...state.settings, viewName } })),
	reset: () =>
		set({
			settings: DEFAULT_GRID_SETTINGS,
		}),
}));
