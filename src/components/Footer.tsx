const randomFooterInfo = [
	"© 2025 NewsApp",
	"Всі права захищені",
	"Розроблено ChikiBum",
	"Завітайте ще!",
];
const info =
	randomFooterInfo[Math.floor(Math.random() * randomFooterInfo.length)];

export default function Footer() {
	return (
		<footer className="mh-[10vh] py-4 bg-gray-100 mt-8 text-center">
			<div>Footer</div>
			<div>{info}</div>
		</footer>
	);
}
