import type { NewsItem } from "@/types/index";

export type GetNewsFilters = {
	limit: number;
	page: number;
};

export async function getNews(filters?: GetNewsFilters) {

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, title: "Новина 1" },
    { id: 2, title: "Новина 2" },
    { id: 3, title: "Новина 3" },
    { id: 4, title: "Новина 4" },
    { id: 5, title: "Новина 5" },
    { id: 6, title: "Новина 6" },
    { id: 7, title: "Новина 7" },
    { id: 8, title: "Новина 8" },
    { id: 9, title: "Новина 9" },
    { id: 10, title: "Новина 10" },
    { id: 11, title: "Новина 11" },
    { id: 12, title: "Новина 12" },
    { id: 13, title: "Новина 13" },
    { id: 14, title: "Новина 14" },
    { id: 15, title: "Новина 15" },
    { id: 16, title: "Новина 16" },
    { id: 17, title: "Новина 17" },
    { id: 18, title: "Новина 18" },
    { id: 19, title: "Новина 19" },
    { id: 20, title: "Новина 20" },
    { id: 21, title: "Новина 21" },
    { id: 22, title: "Новина 22" },
  ] as NewsItem[];
}
