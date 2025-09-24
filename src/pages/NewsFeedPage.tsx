import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchAllNews } from "../api/newsApi";
import type { NewsItem } from "../types";

export default function NewsFeedPage() {
	const navigate = useNavigate();
	const {
		data: news,
		isLoading,
		isError,
		error,
	} = useQuery<NewsItem[], Error>({
		queryKey: ["news"],
		queryFn: fetchAllNews,
	});

	if (isLoading) return <div>Завантаження...</div>;
	if (isError) return <div>Помилка: {error.message}</div>;

	return (
		<div className="max-w-2xl mx-auto p-4 min-h-[calc(100vh-120px)] flex flex-col">
			<h1 className="text-2xl font-bold mb-4 flex-shrink-0">Новини</h1>
			<div className="flex-1 overflow-y-auto max-h-[calc(100vh-220px)]">
				<ul className="space-y-4">
					{news?.map((item) => (
						<li
							key={item.id}
							className="p-4 bg-white rounded shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2"
						>
							<div>
								<div className="text-blue-600 font-semibold">{item.site}</div>
								<a
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 underline break-all"
								>
									{item.url}
								</a>
								<div className="text-gray-500 text-sm">
									Тайтл: <span className="italic">тайтл</span>
								</div>
								<div className="text-gray-400 text-xs">
									Створено: {new Date(item.createdAt).toLocaleString()}
								</div>
							</div>
							<button
								type="button"
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
								onClick={() => navigate(`/news/${item.id}`)}
							>
								Детальніше
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
