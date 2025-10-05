import { useState } from "react";
import { useSaveViewMutation } from "../api/settingsApi";
import { useGridSettings } from "../store/gridSettings.store";
import type { GridToolbarProps } from "../types";
import { ExportButtons } from "./ExportButtons";

export const GridToolbar = ({
	data,
	columns,
	onSelectView,
	savedViews,
}: GridToolbarProps) => {
	const { settings, setViewName } = useGridSettings();
	const [viewNameInput, setViewNameInput] = useState(settings.viewName || "");
	const saveViewMutation = useSaveViewMutation();

	const handleSaveView = () => {
		saveViewMutation.mutate({
			...settings,
			viewName: viewNameInput,
			columns,
		});
		setViewName(viewNameInput);
	};

	return (
		<div className="flex flex-wrap gap-2 items-center p-2 bg-white rounded shadow mb-2">
			<div className="flex gap-2">
				<input
					className="border px-2 py-1 rounded"
					value={viewNameInput}
					onChange={(e) => setViewNameInput(e.target.value)}
					placeholder="View Name"
				/>
				<button
					type="button"
					className="btn"
					onClick={handleSaveView}
					disabled={saveViewMutation.isPending}
				>
					Save View
				</button>
			</div>
			<div>
				<select
					className="border px-2 py-1 rounded"
					value={settings.viewName}
					onChange={(e) => onSelectView(e.target.value)}
				>
					<option value="">Select View</option>
					{savedViews?.map((v) => (
						<option key={v.id} value={v.viewName}>
							{v.viewName}
						</option>
					))}
				</select>
			</div>
			<ExportButtons items={data} columns={columns} />
		</div>
	);
};
