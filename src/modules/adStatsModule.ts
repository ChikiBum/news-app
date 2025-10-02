import type { AdStatEventType } from "../types";

const BACKEND_URL = "http://localhost:3000/ads/event/";
const anonId: string = localStorage.getItem("anonId") ?? crypto.randomUUID();
localStorage.setItem("anonId", anonId);

export function sendAdStatEvent({
	anonId,
	type,
	adId,
	meta,
}: {
	anonId: string;
	type: string;
	adId?: string;
	meta?: unknown;
}) {
	fetch(`${BACKEND_URL}${type}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ anonId, adId, meta }),
	}).catch(() => {});
}

function registerPrebidEvents() {
	sendAdStatEvent({
		anonId,
		type: "load_page",
		meta: { url: window.location.href },
	});
	sendAdStatEvent({ anonId, type: "load_ad_module" });

	if (window.pbjs && typeof window.pbjs.onEvent === "function") {
		const statEvents: AdStatEventType[] = [
			"auctionInit",
			"auctionEnd",
			"bidRequested",
			"bidResponse",
			"bidWon",
		];

		statEvents.forEach((eventType) => {
			window.pbjs.onEvent(eventType, (data: unknown) => {
				sendAdStatEvent({ anonId, type: eventType, meta: data });
			});
		});
	}
}

if (window.pbjs && typeof window.pbjs.onEvent === "function") {
	registerPrebidEvents();
} else {
	const old = window.pbjs;
	Object.defineProperty(window, "pbjs", {
		set(value) {
			this._pbjs = value;
			if (typeof value.onEvent === "function") {
				registerPrebidEvents();
			}
		},
		get() {
			return this._pbjs || old;
		},
		configurable: true,
	});
}

// localStorage.setItem("adStatsModule", "true");
