import { useQuery } from "@tanstack/react-query";
import { getNews } from "../api/news";

type NewsItem = {
	id: number;
	title: string;
};

function NewsFeedPage() {
	const { data, isLoading, error } = useQuery<NewsItem[]>({
		queryKey: ["test-news"],
		queryFn: async () => {
			return await getNews();
		},
	});

	if (isLoading) return <div>Завантаження...</div>;
	if (error) return <div>Сталася помилка!</div>;

	return (
		<div>
			<h1>Стрічка новин</h1>
			<ul>
				{data?.map((news: NewsItem) => (
					<li key={news.id}>{news.title}</li>
				))}
			</ul>
		</div>
	);
}
export default NewsFeedPage;
