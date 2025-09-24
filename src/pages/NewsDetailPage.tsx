import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNewsById } from "../api/newsApi";

export default function NewsDetailPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const {
		data: news,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["news", id],
		queryFn: () => fetchNewsById(id!),
		enabled: !!id,
	});

	if (isLoading) return <div>Завантаження...</div>;
	if (isError) return <div>Помилка: {error.message}</div>;
	if (!news) return <div>Новину не знайдено</div>;

	console.log("news ", news);

	return (
		<div className="flex-1 overflow-y-auto max-h-[calc(100vh-220px)]">
			<div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-900 rounded shadow mt-8">
				<button
					type="button"
					className="mb-4 text-blue-500 hover:underline"
					onClick={() => navigate(-1)}
				>
					← Назад
				</button>
				<div className="mb-2 text-gray-600">{news.site}</div>
				<a
					href={news.url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-xl text-blue-700 underline break-all"
				>
					{news.url}
				</a>
				<h1 className="text-2xl font-bold my-4">{news.parsedH1}</h1>
				<img
					src={news.parsedImg}
					alt={news.parsedH1}
					className="rounded mb-4"
					loading="lazy"
				/>
				<div className="mb-4">{news.parsedText}</div>
				<div className="text-gray-400 text-xs">
					Створено: {new Date(news.createdAt).toLocaleString()}
				</div>
			</div>
		</div>
	);
}
