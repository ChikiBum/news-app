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

	return (
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
			<div className="text-2xl font-bold my-4">Тайтл (заглушка)</div>
			<img
				src="https://placehold.co/600x200?text=Зображення"
				alt="Заглушка"
				className="rounded mb-4"
			/>
			<div className="mb-4">Контент (заглушка)</div>
			<div className="text-gray-400 text-xs">
				Створено: {new Date(news.createdAt).toLocaleString()}
			</div>
		</div>
	);
}
