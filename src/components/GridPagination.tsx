import { useGridSettings } from "../store/gridSettings.store";
import type { GridPaginationProps } from "../types";

export const GridPagination = ({ total }: GridPaginationProps) => {
	const { settings, setPage, setPageSize } = useGridSettings();
	const totalPages = Math.ceil(total / settings.pageSize);

	return (
		<div className="flex items-center gap-2 mt-2">
			<button
				type="button"
				className="btn"
				disabled={settings.page === 1}
				onClick={() => setPage(settings.page - 1)}
			>
				Prev
			</button>
			<span>
				Page {settings.page} of {totalPages}
			</span>
			<button
				type="button"
				className="btn"
				disabled={settings.page === totalPages}
				onClick={() => setPage(settings.page + 1)}
			>
				Next
			</button>
			<select
				className="border px-2 py-1 rounded"
				value={settings.pageSize}
				onChange={(e) => setPageSize(Number(e.target.value))}
			>
				{[25, 50, 100, 200].map((size) => (
					<option key={size} value={size}>
						{size}
					</option>
				))}
			</select>
		</div>
	);
};
