import { Link } from "react-router-dom";

const randomHeaderInfo = [
	"Вітаємо у NewsApp!",
	"Сьогодні чудова погода!",
	"Новини оновлюються щогодини!",
	"Розкажіть друзям про нас!",
];
const info =
	randomHeaderInfo[Math.floor(Math.random() * randomHeaderInfo.length)];

export default function Header() {
	return (
		<header className="h-[10vh] bg-white p-6 mb-8">
			<div className="flex items-center justify-between text-xl font-bold text-gray-800 text-center">
				{info}
			</div>
			<nav className="flex gap-6">
				<Link
					to="/"
					className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
				>
					Main page
				</Link>
				<Link
					to="/news"
					className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
				>
					News
				</Link>
				<Link
					to="/login"
					className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
				>
					Вхід
				</Link>
			</nav>
		</header>
	);
}
