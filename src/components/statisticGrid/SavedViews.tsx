import { useDeleteViewMutation, useSavedViews } from "../../api/settingsApi";
import { useGridSettings } from "../../store/gridSettings.store";
import type { GridSavedViewsProps, SavedView } from "../../types";

export const SavedViews = ({ onSelectView }: GridSavedViewsProps) => {
	const { data: savedViews, isLoading } = useSavedViews();
	const deleteMutation = useDeleteViewMutation();
	const { setViewName } = useGridSettings();

	if (isLoading) return <div>Loading views...</div>;

	const handleDelete = (id: string) => {
		deleteMutation.mutate(id);
	};

	return (
		<div className="bg-white p-2 rounded shadow mb-2">
			<h3 className="font-bold mb-2">Saved Views</h3>
			<ul>
				{Array.isArray(savedViews) && savedViews.length > 0 ? (
					savedViews.map((v: SavedView) => (
					<li key={v.id} className="flex items-center gap-2">
						<button
							type="button"
							className="text-blue-600 hover:underline"
							onClick={() => {
								setViewName(v.viewName);
								onSelectView(v.viewName);
							}}
						>
							{v.viewName}
						</button>
						<button
							type="button"
							className="text-red-600"
							onClick={() => handleDelete(v.id)}
						>
							Delete
						</button>
					</li>
					))
				) : (
					<li className="text-gray-500">No saved views</li>
				)}
			</ul>
		</div>
	);
};
