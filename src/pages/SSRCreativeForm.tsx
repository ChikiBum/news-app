import type React from "react";
import { useEffect } from "react";

const SSRCreativeForm: React.FC = () => {
	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

	useEffect(() => {
		window.location.href = `${BACKEND_URL}/ssr`;
	}, []);

	return (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<h2>Перенаправление на SSR форму...</h2>
			<p>Если автоматическое перенаправление не работает:</p>
			<a
				href={`${BACKEND_URL}/ssr`}
				target="_blank"
				rel="noopener noreferrer"
			>
				Открыть форму создания креатива
			</a>
		</div>
	);
};

export default SSRCreativeForm;
