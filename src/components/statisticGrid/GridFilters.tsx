import { useEffect, useState } from "react";
import { useGridSettings } from "../../store/gridSettings.store";
import type { GridFiltersProps } from "../../types";

export const GridFilters = ({ columns }: GridFiltersProps) => {
	const { settings, setFilters } = useGridSettings();
	const [localFilters, setLocalFilters] = useState(settings.filters);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setFilters(localFilters);
		}, 2000);

		return () => clearTimeout(timeoutId);
	}, [localFilters, setFilters]);

	const formatDateValue = (value: string) => {
		if (!value) return "";
		return value.split("T")[0];
	};

	const handleChange = (col: string, value: string) => {
		if (col === "createdAt" && value) {
			value = formatDateValue(value);
		}

		if (value.trim() === "") {
			const { [col]: _removed, ...restFilters } = localFilters;
			setLocalFilters(restFilters);
		} else {
			setLocalFilters({ ...localFilters, [col]: value });
		}
	};

	const clearFilter = (col: string) => {
		const { [col]: _removed, ...restFilters } = localFilters;
		setLocalFilters(restFilters);
	};

	const renderInput = (col: string) => {
		const isDateField = col === "createdAt";
		const inputType = isDateField ? "date" : "text";
		const value = localFilters[col] || "";

		return (
			<input
				id={`filter-${col}`}
				type={inputType}
				className={`border px-2 py-1 pr-8 rounded ${
					isDateField
						? "[&::-webkit-calendar-picker-indicator]:bg-white  [&::-webkit-calendar-picker-indicator]:border-gray-300 [&::-webkit-calendar-picker-indicator]:rounded [&::-webkit-calendar-picker-indicator]:p-1"
						: ""
				}`}
				placeholder={isDateField ? "Select date" : `Filter by ${col}`}
				value={isDateField ? formatDateValue(value) : value}
				onChange={(e) => handleChange(col, e.target.value)}
			/>
		);
	};

	return (
		<div className="flex gap-2 mb-2">
			{columns.map((col) => (
				<div key={col} className="relative">
					{renderInput(col)}
					{localFilters[col] && (
						<button
							type="button"
							onClick={() => clearFilter(col)}
							className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
							aria-label={`Clear ${col} filter`}
						>
							×
						</button>
					)}
				</div>
			))}
		</div>
	);
};
