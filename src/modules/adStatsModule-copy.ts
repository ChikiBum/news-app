import type { AdStatEventType } from "../types";

const BACKEND_URL = "http://localhost:3000/ads/event/stat";

export function sendAdStatEvent({
	anonId,
	type,
	adId,
	meta,
}: {
	anonId: string;
	type: AdStatEventType;
	adId?: string;
	meta?: unknown;
}) {
	fetch(BACKEND_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ anonId, type, adId, meta }),
	}).catch((error) => {
		console.error("Failed to send ad stat event:", error);
	});
}
