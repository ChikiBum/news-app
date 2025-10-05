import { useEffect, useState } from "react";
import { useGridData } from "../api/gridApi";
import { useSavedViews } from "../api/settingsApi";
import { GridFilters } from "../components/GridFilters";
import { GridPagination } from "../components/GridPagination";
import { GridTable } from "../components/GridTable";
import { GridToolbar } from "../components/GridToolbar";
import { SavedViews } from "../components/SavedViews";
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
	const [columns, setLocalColumns] = useState(DEFAULT_COLUMNS);

	const { data: savedViews } = useSavedViews();

	const { data, isLoading, error } = useGridData({
		...settings,
		columns,
	});

	const handleSelectView = (viewName: string) => {
		const view = savedViews?.find((v: SavedView) => v.viewName === viewName);
		if (view) {
			setColumns(view.columns);
			setFilters(view.filters);
			setSort(view.sort);
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
		<div className="max-w-screen-2xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Statistics Grid</h1>
			<GridToolbar
				data={data?.items ?? []}
				columns={columns}
				onSelectView={handleSelectView}
				savedViews={savedViews}
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
