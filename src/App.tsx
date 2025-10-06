import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import NewsFeedPage from "./pages/NewsFeedPage";
import SSRCreativeForm from "./pages/SSRCreativeForm";

import "virtual:plugins";

function App() {
	return (
		<Router>
			<Header />
			<div className="flex flex-col items-center justify-center min-w-screen sm h-[70vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route
						path="/news"
						element={
							<ProtectedRoute>
								<NewsFeedPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/news/:id"
						element={
							<ProtectedRoute>
								<NewsDetailPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/ssr-form"
						element={
							<ProtectedRoute>
								<SSRCreativeForm />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</div>
			<Footer />
		</Router>
	);
}

export default App;
