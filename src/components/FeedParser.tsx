import { useId, useState } from "react";
import { useParseFeedMutation } from "../api/feedApi";

export const FeedParser = () => {
	const [feedUrl, setFeedUrl] = useState("https://www.kashtan.news/feed/");
	const [isValidUrl, setIsValidUrl] = useState(true);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const parseFeedMutation = useParseFeedMutation();

	const feedUrlId = useId();

	const validateUrl = (url: string): boolean => {
		try {
			new URL(url);
			return url.includes("feed") || url.includes("rss") || url.includes("xml");
		} catch {
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!feedUrl.trim()) {
			setIsValidUrl(false);
			return;
		}

		if (!validateUrl(feedUrl)) {
			setIsValidUrl(false);
			return;
		}

		try {
			await parseFeedMutation.mutateAsync({ url: feedUrl.trim() });
			setFeedUrl("");
			setIsValidUrl(true);
		} catch (error) {
			console.error("Error parsing feed:", error);
		}
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const url = e.target.value;
		setFeedUrl(url);
		setIsValidUrl(true);
	};

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggleCollapse();
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
			<button
				type="button"
				className="w-full flex items-center justify-between p-4 bg-blue-500 border-b hover:bg-blue-600 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors "
				onClick={toggleCollapse}
				onKeyDown={handleKeyDown}
				aria-expanded={!isCollapsed}
				aria-controls="feed-parser-content"
			>
				<h2 className="text-xl font-bold text-left ">Додати новий RSS фід</h2>
				<span
					className="p-2 rounded-full hover:bg-gray-200 transition-colors"
					aria-hidden="true"
				>
					<svg
						className={`w-5 h-5 transform transition-transform duration-200 ${
							isCollapsed ? "rotate-180" : "rotate-0"
						}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<title>{isCollapsed ? "Розгорнути форму" : "Згорнути форму"}</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</span>
			</button>
			<div
				id={feedUrlId}
				className={`transition-all duration-300 ease-in-out overflow-hidden ${
					isCollapsed ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
				}`}
				aria-hidden={isCollapsed}
			>
				<div className="p-6">
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor={feedUrlId}
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								URL RSS фіду
							</label>
							<input
								id={feedUrlId}
								type="url"
								value={feedUrl}
								onChange={handleUrlChange}
								placeholder="https://example.com/feed/"
								className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors text-blue-600 ${
									!isValidUrl
										? "border-red-500 focus:ring-red-500"
										: "border-gray-300 focus:ring-blue-500"
								}`}
								disabled={parseFeedMutation.isPending}
								aria-describedby={
									!isValidUrl ? `${feedUrlId}-error` : undefined
								}
								aria-invalid={!isValidUrl}
							/>
							{!isValidUrl && (
								<p
									id={`${feedUrlId}-error`}
									className="mt-1 text-sm text-red-600"
									role="alert"
								>
									Будь ласка, введіть валідний URL RSS фіду
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={parseFeedMutation.isPending || !feedUrl.trim()}
							className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{parseFeedMutation.isPending ? (
								<span className="flex items-center justify-center">
									<svg
										className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
										aria-hidden="true"
									>
										<title>Завантаження</title>
									</svg>
									Парсинг фіду...
								</span>
							) : (
								"Додати фід"
							)}
						</button>
					</form>

					{/* ✅ Error message */}
					{parseFeedMutation.isError && (
						<div
							className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
							role="alert"
							aria-live="polite"
						>
							<p className="font-medium">Помилка:</p>
							<p>
								{parseFeedMutation.error?.message || "Не вдалося обробити фід"}
							</p>
						</div>
					)}

					{/* ✅ Success message */}
					{parseFeedMutation.isSuccess && (
						<div
							className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
							role="alert"
							aria-live="polite"
						>
							<p className="font-medium">Успіх!</p>
							<p>
								Фід успішно оброблено. Додано{" "}
								{parseFeedMutation.data?.news?.length || 0} новин.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
