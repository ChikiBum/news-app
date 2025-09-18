import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../api/mockNewsApi";
import { useAuthStore } from "../store/authStore";

export default function NewsPage() {
	const token = useAuthStore((state) => state.token);

	const { data, error, isLoading } = useQuery({
		queryKey: ["news", token],
		queryFn: () => fetchNews(token),
		enabled: !!token,
	});

	return (
		<div
			style={{
				maxWidth: 500,
				margin: "40px auto",
				padding: 24,
				border: "1px solid #ccc",
				borderRadius: 8,
			}}
		>
			<h2>Новини</h2>
			{isLoading && <div>Завантаження...</div>}
			{error && <div style={{ color: "red" }}>Помилка: {error.message}</div>}
			<ul>
				{(Array.isArray(data) ? data : []).map((news) => (
					<li key={news.id} style={{ marginBottom: 16 }}>
						<strong>{news.title}</strong>
						<div>{news.content}</div>
					</li>
				))}
			</ul>
		</div>
	);
}
