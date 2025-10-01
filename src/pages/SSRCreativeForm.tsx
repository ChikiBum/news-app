import type React from "react";
import { useEffect } from "react";

const SSRCreativeForm: React.FC = () => {
	useEffect(() => {
		window.location.href = "http://localhost:3000/ssr";
	}, []);

	return (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<h2>Перенаправление на SSR форму...</h2>
			<p>Если автоматическое перенаправление не работает:</p>
			<a
				href="http://localhost:3000/ssr"
				target="_blank"
				rel="noopener noreferrer"
			>
				Открыть форму создания креатива
			</a>
		</div>
	);
};

export default SSRCreativeForm;
