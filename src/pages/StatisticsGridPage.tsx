import { useEffect, useState } from "react";
import { useGridData } from "../api/gridApi";
import { useSavedViews } from "../api/settingsApi";
import { GridFilters } from "../components/statisticGrid/GridFilters";
import { GridPagination } from "../components/statisticGrid/GridPagination";
import { GridTable } from "../components/statisticGrid/GridTable";
import { GridToolbar } from "../components/statisticGrid/GridToolbar";
import { SavedViews } from "../components/statisticGrid/SavedViews";
import { useGridSettings } from "../store/gridSettings.store";
import type { SavedView } from "../types";

const DEFAULT_COLUMNS = [
	"Date",
	"Hour",
	"Unique Uid Init",
	"Player Inits",
	"Player Starts",
	"Impressions Good",
	"Ctr",
	"Ecpm",
	"Page Rpm",
	"Revenue Payable",
	"Revenue Channel Net",
	"Ad Opportunities",
	"Fill Rate Imps Init",
	"Fill Rate Imps Session Init",
	"Click",
];

function normalizeSort(
	sort: { field: string; direction: "asc" | "desc" | string }[] | undefined,
): { field: string; direction: "asc" | "desc" }[] {
	if (!Array.isArray(sort) || sort.length === 0)
		return [{ field: "Date", direction: "desc" }];
	return sort.map((s) => ({
		field: s.field,
		direction: s.direction === "asc" ? "asc" : "desc",
	}));
}

export default function StatisticsGridPage() {
	const {
		settings,
		setColumns,
		setFilters,
		setSort,
		setPage,
		setPageSize,
		setViewName,
	} = useGridSettings();

	const [columns, setLocalColumns] = useState<string[]>(
		settings.columns && settings.columns.length > 0
			? settings.columns
			: DEFAULT_COLUMNS,
	);

	const { data: savedViews } = useSavedViews();

	const normalizedSettings = {
		...settings,
		sort: normalizeSort(settings.sort),
		columns: columns,
	};

	const { data, isLoading, error } = useGridData(normalizedSettings);

	const handleSelectView = (viewName: string) => {
		const view = Array.isArray(savedViews)
			? savedViews.find((v: SavedView) => v.viewName === viewName)
			: undefined;
		if (view) {
			setColumns(view.columns);
			setFilters(view.filters);
			setSort(normalizeSort(view.sort));
			setPage(view.page);
			setPageSize(view.pageSize);
			setViewName(view.viewName);
			setLocalColumns(view.columns);
		}
	};

	useEffect(() => {
		setColumns(columns);
	}, [columns, setColumns]);

	return (
		<div className="flex-1 overflow-y-auto max-h-[calc(100vh-220px)]">
			<h1 className="text-3xl font-bold mb-4">Statistics Grid</h1>
			<GridToolbar
				data={data?.items ?? []}
				columns={columns}
				onSelectView={handleSelectView}
				savedViews={savedViews ?? []}
			/>
			<SavedViews onSelectView={handleSelectView} />
			<GridFilters columns={columns} />
			<div className="shadow rounded">
				<GridTable
					columns={columns}
					data={data?.items ?? []}
					isLoading={isLoading}
					error={error}
				/>
			</div>
			<GridPagination total={data?.total ?? 0} />
		</div>
	);
}
