import { useGridSettings } from "../store/gridSettings.store";
import type { GridFiltersProps } from "../types";

export const GridFilters = ({ columns }: GridFiltersProps) => {
	const { settings, setFilters } = useGridSettings();

	const handleChange = (col: string, value: string) => {
		setFilters({ ...settings.filters, [col]: value });
	};

	return (
		<div className="flex gap-2 mb-2">
			{columns.map((col) => (
				<input
					key={col}
					className="border px-2 py-1 rounded"
					placeholder={`Filter by ${col}`}
					value={settings.filters[col] || ""}
					onChange={(e) => handleChange(col, e.target.value)}
				/>
			))}
		</div>
	);
};
