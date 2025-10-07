import type React from "react";
import { useState } from "react";

const SSRCreativeForm: React.FC = () => {
	const BACKEND_URL =
		import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";
	const [isLoading, setIsLoading] = useState(true);

	const handleIframeLoad = () => {
		setIsLoading(false);
	};

	return (
		<div className="w-full h-full overflow-hidden ">
			<div className="p-4 mb-4">
				<h1 className="text-2xl font-bold mb-4">SSR Creative Form</h1>

				{isLoading && (
					<div className="text-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
						<p className="mt-2">Loading form...</p>
					</div>
				)}

				<iframe
					src={`${BACKEND_URL}/ssr`}
					className="w-full h-[calc(100vh-200px)] border rounded shadow mb-14"
					onLoad={handleIframeLoad}
					title="SSR Creative Form"
				/>
			</div>
		</div>
	);
};

export default SSRCreativeForm;
