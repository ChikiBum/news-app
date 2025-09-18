import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "virtual:plugins";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import NewsFeedPage from "./pages/NewsFeedPage";

function App() {
	useEffect(() => {
		localStorage.clear();
	}, []);

	return (
		<Router>
			<Header />
			<div className="flex flex-col items-center justify-center min-w-screen sm h-[70vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/news" element={<NewsFeedPage />} />
					<Route path="/news/:id" element={<NewsDetailPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</div>
			<Footer />
		</Router>
	);
}

export default App;
