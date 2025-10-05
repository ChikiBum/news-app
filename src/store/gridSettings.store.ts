import { create } from "zustand";
import type { GridSettingsState } from "../types";

export const useGridSettings = create<GridSettingsState>((set) => ({
	settings: {
		filters: {},
		sort: [],
		page: 1,
		pageSize: 100,
		columns: [],
		viewName: "Default",
	},
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
			settings: {
				filters: {},
				sort: [],
				page: 1,
				pageSize: 100,
				columns: [],
				viewName: "Default",
			},
		}),
}));
