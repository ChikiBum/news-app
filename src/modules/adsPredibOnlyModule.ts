declare global {
	interface Window {
		pbjs: {
			que: Array<() => void>;
			setConfig: (config: {
				enableTIDs?: boolean;
				debug?: boolean;
				[key: string]: unknown;
			}) => void;
			addAdUnits: (
				adUnits: Array<{
					code: string;
					mediaTypes: {
						banner?: {
							sizes: Array<[number, number]>;
						};
						video?: Record<string, unknown>;
						native?: Record<string, unknown>;
					};
					bids: Array<{
						bidder: string;
						params: Record<string, unknown>;
					}>;
				}>,
			) => void;
			requestBids: (options: {
				timeout?: number;
				bidsBackHandler?: () => void;
				adUnits?: Array<Record<string, unknown>>;
			}) => void;
			getHighestCpmBids: (adUnitCode?: string) => PrebidBid[];
			renderAd: (doc: Document, adId: string) => void;
			getBidRequests?: () => Array<Record<string, unknown>>;
			getBidResponses?: () => Record<string, PrebidBid[]>;
			getAllWinningBids?: () => PrebidBid[];
			setTargetingForGPTAsync?: (adUnitCode: string) => void;
			[key: string]: unknown;
		};
	}
}

interface PrebidBid {
	adId: string;
	adUnitCode: string;
	auctionId: string;
	bidder: string;
	bidderCode: string;
	cpm: number;
	creativeId: string;
	currency: string;
	dealId?: string;
	height: number;
	mediaType: "banner" | "video" | "native";
	netRevenue: boolean;
	originalCpm: number;
	originalCurrency: string;
	requestId: string;
	responseTimestamp: number;
	size: string;
	source: string;
	timeToRespond: number;
	ttl: number;
	width: number;
	ad?: string;
	adserverTargeting?: Record<string, string>;
	meta?: {
		advertiserDomains?: string[];
		brandId?: number;
		brandName?: string;
		primaryCatId?: string;
		secondaryCatIds?: string[];
		mediaType?: string;
	};
}

window.addEventListener("load", () => {
	const AD_SIZES: Array<[number, number]> = [
		[300, 250],
		[250, 250],
	];
	const bidders = [
		{
			bidder: "adtelligent",
			params: {
				aid: 350975,
			},
		},
		{
			bidder: "bidmatic",
			params: {
				source: 886409,
				bidfloor: 0.1,
			},
		},
	];

	const adsContainerCode = ".ads-wrapper";
	const processedElements = new Set<Element>();

	let adIdCounter = 1;
	function generateUniqueAdId(): string {
		return `my-uniq-id-${adIdCounter++}`;
	}

	const prebidScript = document.createElement("script");
	prebidScript.src =
		"http://localhost:4444/bundle?modules=adtelligentBidAdapter&modules=bidmaticBidAdapter";
	prebidScript.async = true;

	prebidScript.onload = () => {
		runPrebid();
	};
	document.head.appendChild(prebidScript);

	function runPrebid() {
		const localDebug = localStorage.getItem("prebidDebug");

		const adsContainers = document.querySelectorAll(adsContainerCode);
		const adUnits = Array.from(adsContainers).map((container) => {
			const uniqueId = generateUniqueAdId();
			container.setAttribute("data-ad-id", uniqueId);
			return {
				code: uniqueId,
				mediaTypes: {
					banner: {
						sizes: AD_SIZES,
					},
				},
				bids: bidders,
			};
		});

		console.log("adUnits ", adUnits);

		if (adUnits.length === 0) {
			return;
		}
		window.pbjs = window.pbjs || {};
		const wpbjs = window.pbjs;
		wpbjs.que = wpbjs.que || [];

		wpbjs.que.push(() => {
			wpbjs.setConfig({
				enableTIDs: true,
				debug: Boolean(localDebug),
			});
			wpbjs.addAdUnits(adUnits);

			wpbjs.requestBids({
				timeout: 1000,
				bidsBackHandler: sendAdServerRequest,
			});
		});

		function sendAdServerRequest() {
			const adsContainers = document.querySelectorAll(
				`${adsContainerCode}[data-ad-id]`,
			);

			adsContainers.forEach((adsContainer) => {
				const containerElement = adsContainer as Element;
				const adId = containerElement.getAttribute("data-ad-id");

				if (!adId || processedElements.has(containerElement)) {
					return;
				}
				console.log("before processedElements ", processedElements);
				processedElements.add(containerElement);
				console.log("after processedElements ", processedElements);
				const bids = wpbjs.getHighestCpmBids(adId);
				containerElement.innerHTML = "";

				const shadowRoot = (containerElement as HTMLElement).attachShadow({
					mode: "open",
				});
				const iframe = document.createElement("iframe");
				iframe.frameBorder = "14px";
				iframe.scrolling = "no";

				if (bids.length > 0) {
					const winningBid: PrebidBid = bids[0];
					console.log("winningBid ", typeof winningBid);

					iframe.style.width = `${winningBid.width}px`;
					iframe.style.height = `${winningBid.height}px`;

					(containerElement as HTMLElement).style.width =
						`${winningBid.width}px`;
					(containerElement as HTMLElement).style.height =
						`${winningBid.height}px`;

					iframe.onload = () => {
						const iframeDoc = iframe.contentWindow?.document;
						if (!iframeDoc) return;
						const style = iframeDoc.createElement("style");
						style.innerHTML = `
							* { margin: 0; padding: 0; box-sizing: border-box; }
							body { margin: 0; padding: 0; overflow: hidden; }
							html { margin: 0; padding: 0; }
						`;
						iframeDoc.head.appendChild(style);

						wpbjs.renderAd(iframeDoc, bids[0].adId);
					};
					shadowRoot.appendChild(iframe);
				} else {
					iframe.onload = () => {
						const iframeDoc = iframe.contentWindow?.document;
						if (!iframeDoc) return;
						iframeDoc.open();
						iframeDoc.write(`
					<html>
							<head>
									<style>
											* { margin: 0; padding: 0; box-sizing: border-box; }
											body { margin: 0; padding: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
											html { margin: 0; padding: 0; }
									</style>
							</head>
							<body>
									<h1 style="font-size: 16px;">No bids received</h1>
							</body>
					</html>
			`);
						iframeDoc.close();
					};
					shadowRoot.appendChild(iframe);
				}
			});
		}
	}
});
