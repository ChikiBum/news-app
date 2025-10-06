import { useMemo } from "react";
import { useGridSettings } from "../../store/gridSettings.store";
import type { GridTableProps, Row } from "../../types";

export const GridTable = ({
	columns,
	data,
	isLoading,
	error,
}: GridTableProps) => {
	const { settings, setSort } = useGridSettings();

	const handleSort = (col: string) => {
		const currentSort = settings.sort?.[0];
		if (currentSort?.field === col) {
			setSort([
				{
					field: col,
					direction: currentSort.direction === "asc" ? "desc" : "asc",
				},
			]);
		} else {
			setSort([{ field: col, direction: "asc" }]);
		}
	};

	const sortedData = useMemo(() => {
		if (!settings.sort?.length) return data;
		const [{ field, direction }] = settings.sort;
		return [...data].sort((a, b) => {
			if (a[field] === b[field]) return 0;
			if (a[field] === undefined) return 1;
			if (b[field] === undefined) return -1;
			if (typeof a[field] === "number" && typeof b[field] === "number") {
				return direction === "asc" ? a[field] - b[field] : b[field] - a[field];
			}
			return direction === "asc"
				? String(a[field]).localeCompare(String(b[field]))
				: String(b[field]).localeCompare(String(a[field]));
		});
	}, [data, settings.sort]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading data</div>;

	return (
		<div className="overflow-x-auto border rounded-lg bg-white">
			<table className="min-w-full divide-y divide-gray-200 text-blue-700">
				<thead>
					<tr>
						{columns.map((col: string) => {
							const isSorted = settings.sort?.[0]?.field === col;
							return (
								<th
									key={col}
									className="px-4 py-2 cursor-pointer select-none whitespace-nowrap"
									onClick={() => handleSort(col)}
									title="Sort"
									style={{ userSelect: "none" }}
								>
									<span>{col}</span>
									{isSorted && (
										<span className="ml-1 text-xs align-middle">
											{settings.sort?.[0]?.direction === "asc" ? "▲" : "▼"}
										</span>
									)}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{sortedData.map((row: Row, idx: number) => (
						<tr
							key={row.id ? String(row.id) : idx}
							className="hover:bg-blue-50"
						>
							{columns.map((col: string) => (
								<td key={col} className="px-4 py-2 whitespace-nowrap">
									{row[col] as React.ReactNode}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
