import Papa from "papaparse";
import * as XLSX from "xlsx";

type Row = Record<string, unknown>;

interface ExportButtonsProps {
	items: Row[];
	columns: string[];
}

export function ExportButtons({ items, columns }: ExportButtonsProps) {
	const exportCSV = () => {
		const csv = Papa.unparse(
			items.map((row: Row) =>
				Object.fromEntries(columns.map((col: string) => [col, row[col]])),
			),
		);
		const blob = new Blob([csv], { type: "text/csv" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "grid-data.csv";
		link.click();
	};

	const exportXLSX = () => {
		const ws = XLSX.utils.json_to_sheet(
			items.map((row: Row) =>
				Object.fromEntries(columns.map((col: string) => [col, row[col]])),
			),
		);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "GridData");
		XLSX.writeFile(wb, "grid-data.xlsx");
	};

	return (
		<div className="flex gap-2">
			<button type="button" onClick={exportCSV} className="btn">
				Export CSV
			</button>
			<button type="button" onClick={exportXLSX} className="btn">
				Export Excel
			</button>
		</div>
	);
}
