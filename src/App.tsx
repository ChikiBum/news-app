import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NewsFeedPage from "./pages/NewsFeedPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsFeedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
