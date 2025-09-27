import type { PrebidBid } from "../types";

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

	const prebidScriptUrl =
		"http://localhost:4444/bundle?modules=adtelligentBidAdapter&modules=bidmaticBidAdapter";
	const adsContainerCode = ".ads-wrapper";
	const processedElements = new Set<Element>();

	let adIdCounter = 1;
	function generateUniqueAdId(): string {
		return `my-uniq-id-${adIdCounter++}`;
	}

	const prebidScript = document.createElement("script");
	prebidScript.src = prebidScriptUrl;
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

				processedElements.add(containerElement);
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
