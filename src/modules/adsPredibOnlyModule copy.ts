import type { AdStatEventType, PrebidBid } from "../types";

window.addEventListener("load", () => {
	const AD_SIZES: Array<[number, number]> = [
		[300, 250],
		[250, 250],
		[728, 90],
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
		{
			bidder: "obozhko",
			params: {
				anonId: localStorage.getItem("anonId") || "test-uid",
				geo: "UA",
			},
		},
	];

	// const prebidScriptUrl =
	// "http://localhost:4444/bundle?modules=adtelligentBidAdapter&modules=bidmaticBidAdapter&modules=obozhkoBidAdapter";
	const prebidScriptUrl =
		"http://localhost:4444/bundle?modules=obozhkoBidAdapter";
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

		let anonId = localStorage.getItem("anonId");
		if (!anonId) {
			anonId = crypto.randomUUID();
			localStorage.setItem("anonId", anonId);
		}


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
			if (sendAdStatEvent) {
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
				iframe.frameBorder = "0";
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
              .ad-close-btn {
                position: absolute;
                top: 0; right: 0;
                width: 24px; height: 24px;
                background: #fff;
                border: none;
                color: #000;
                font-size: 18px;
                cursor: pointer;
                z-index: 10;
                opacity: 0.7;
              }
            `;
						iframeDoc.head.appendChild(style);

						iframeDoc.body.innerHTML =
							winningBid.ad ||
							'<div style="text-align: center; padding: 20px;">No ad content</div>';

						const closeBtn = iframeDoc.createElement("button");
						closeBtn.innerHTML = "&times;";
						closeBtn.className = "ad-close-btn";
						closeBtn.onclick = (e) => {
							e.preventDefault();
							e.stopPropagation();
							try {
								fetch("http://localhost:3000/ads/event/close", {
									method: "POST",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({
										anonId: anonId,
										adId: winningBid.creativeId,
									}),
								});
							} catch (err) {}

							iframe.style.display = "none";
						};
						iframeDoc.body.appendChild(closeBtn);

						iframeDoc.body.addEventListener("click", (e) => {
							if ((e.target as HTMLElement)?.classList.contains("ad-close-btn"))
								return;
							try {
								fetch("http://localhost:3000/ads/event/click", {
									method: "POST",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({
										anonId: anonId,
										adId: winningBid.creativeId,
									}),
								});
							} catch (err) {}
						});

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
