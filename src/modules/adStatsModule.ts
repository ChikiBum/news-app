import type { AdStatEvent, AdStatEventType } from "../types";

const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

const BACKEND_URL = `${backendUrl}/ads/event/`;

const anonId: string = localStorage.getItem("anonId") ?? crypto.randomUUID();
localStorage.setItem("anonId", anonId);

export function sendAdStatEvent({
	anonId,
	type,
	adId,
	meta,
	critical = false,
}: AdStatEvent) {
	const url = `${BACKEND_URL}${type}`;
	const body = JSON.stringify({ anonId, adId, meta });

	if (critical && navigator.sendBeacon) {
		try {
			const blob = new Blob([body], { type: "application/json" });
			navigator.sendBeacon(url, blob);
			return;
		} catch (error) {
			console.error("Error sending beacon:", error);
		}
	}
	fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body,
		keepalive: critical,
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

window.addEventListener("beforeunload", () => {
	sendAdStatEvent({
		anonId,
		type: "pageUnload",
		meta: { url: window.location.href },
		critical: true,
	});
});

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
