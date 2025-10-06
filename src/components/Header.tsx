import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const randomHeaderInfo = [
	"Вітаємо у NewsApp!",
	"Сьогодні чудова погода!",
	"Новини оновлюються щогодини!",
	"Розкажіть друзям про нас!",
];
const info =
	randomHeaderInfo[Math.floor(Math.random() * randomHeaderInfo.length)];

export default function Header() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();
	const user = useAuthStore((state) => state.user);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<header className="h-[10vh] bg-white px-6 py-3 mb-8 flex flex-col justify-between shadow">
			<div className="flex items-center justify-between">
				<div className="text-xl font-bold text-gray-800">{info}</div>
				<nav className="flex gap-6 items-center">
					<Link
						to="/news"
						className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
					>
						News
					</Link>
					{!isAuthenticated && (
						<Link
							to="/"
							className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
						>
							Login
						</Link>
					)}
					{isAuthenticated && (
						<>
							<Link
								to="/ssr-form"
								className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
							>
								Создать креатив
							</Link>
							<Link
								to="/statistics"
								className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
							>
								Статистика
							</Link>
							<button
								type="button"
								onClick={handleLogout}
								className="text-blue-600 hover:text-blue-800 font-medium transition-colors bg-transparent border-none cursor-pointer"
							>
								Logout
							</button>
						</>
					)}
				</nav>
			</div>
			{isAuthenticated && (
				<div className="text-gray-800 font-medium flex justify-end mt-2">
					{user?.username
						? `Вітаю, ${user.username}!`
						: "Вітаю, Користувач без імені!"}
				</div>
			)}
		</header>
	);
}
