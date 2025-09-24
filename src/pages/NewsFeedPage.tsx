import { useQuery } from "@tanstack/react-query";
import { fetchAllNews } from "../api/newsApi";
import type { NewsItem } from "../types";

export default function NewsFeedPage() {
	const {
		data: news,
		isLoading,
		isError,
		error,
	} = useQuery<NewsItem[], Error>({
		queryKey: ["news"],
		queryFn: fetchAllNews,
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error: {error.message}</div>;

	return (
		<div>
			<h1>Новини</h1>
			<ul>
				{news?.map((item) => (
					<li key={item.id}>
						<a href={item.url} target="_blank" rel="noopener noreferrer">
							{item.site}
						</a>
						<div>Створено: {new Date(item.createdAt).toLocaleString()}</div>
					</li>
				))}
			</ul>
		</div>
	);
}
