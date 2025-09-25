const AD_SIZES = [
	[300, 250],
	[250, 250],
];

let adIdCounter = 1;
function generateUniqueAdId(): string {
	return `my-uniq-id-${adIdCounter++}`;
}

const processedElements = new Set<Element>();

function debugLog(...args: any[]) {
	if (localStorage.getItem("adsDebug") === "true") {
		console.log(...args);
	}
}

function debugWarn(...args: any[]) {
	if (localStorage.getItem("adsDebug") === "true") {
		console.warn(...args);
	}
}

function debugError(...args: any[]) {
	if (localStorage.getItem("adsDebug") === "true") {
		console.error(...args);
	}
}

console.log("adsModule подключено через virtual:plugins!");
if (localStorage.getItem("adsDebug") === "true") {
	console.log("🐛 DEBUG MODE: Включено подробное логирование рекламы");
	console.log("💡 Чтобы отключить: localStorage.removeItem('adsDebug')");
}

function appendScriptWithSrc(src: any) {
	debugLog("🔄 Начинаем загрузку скрипта:", src);
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.async = true;
		script.src = src;
		script.onload = () => {
			debugLog("✅ Скрипт успешно загружен:", src);
			resolve(null);
		};
		script.onerror = (error) => {
			debugError("❌ Ошибка загрузки скрипта:", src);
			debugError("Детали ошибки:", error);
			debugError("Script element:", script);
			reject(new Error(`Не удалось загрузить скрипт: ${src}`));
		};
		document.head.appendChild(script);
		debugLog("📤 Скрипт добавлен в DOM:", src);
	});
}

function appendScriptWithCode(code: string) {
	const script = document.createElement("script");
	script.innerHTML = code;
	document.head.appendChild(script);
	return Promise.resolve();
}

function loadAdtelligentBidAdapter() {
	debugLog("🎯 Загружаем AdtelligentBidAdapter...");
	return appendScriptWithSrc(
		"http://localhost:4444/bundle?modules=adtelligentBidAdapter",
	);
}
function loadGoogleScript() {
	debugLog("🔍 Загружаем Google Tag Services...");
	return appendScriptWithSrc("https://www.googletagservices.com/tag/js/gpt.js");
}

function loadPbjsScript() {
	debugLog("📊 Загружаем Prebid.js скрипт...");
	const adsContainers = document.querySelectorAll("#ads-wrapper");
	debugLog("📊 Найдено контейнеров для рекламы:", adsContainers.length);

	const adUnitsData = Array.from(adsContainers).map((container) => {
		const uniqueId = generateUniqueAdId();
		container.setAttribute("data-ad-id", uniqueId);
		debugLog("🆔 Создан уникальный ID:", uniqueId, "для контейнера");
		return {
			code: uniqueId,
			mediaTypes: { banner: { sizes: AD_SIZES } },
			bids: [{ bidder: "adtelligent", params: { aid: 350975 } }],
		};
	});

	debugLog("📋 AdUnits данные:", adUnitsData);

	const debugLogCode =
		localStorage.getItem("adsDebug") === "true"
			? `
      console.log('📊 Prebid.js: создано adUnits:', adUnits.length);
      console.log('📊 Prebid.js: все adUnits:', window.allAdUnits);
    `
			: "";

	return appendScriptWithCode(`
    var pbjs = pbjs || {};
    pbjs.que = pbjs.que || [];
    const adUnits = ${JSON.stringify(adUnitsData)};

    if (!window.allAdUnits) window.allAdUnits = [];
    window.allAdUnits.push(...adUnits);
    ${debugLogCode}
  `);
}
function loadGoogletag() {
	debugLog("🌐 Загружаем Google Tag скрипт...");

	const debugLogCode =
		localStorage.getItem("adsDebug") === "true"
			? `console.log('🌐 Google Tag: настройка завершена');`
			: "";

	return appendScriptWithCode(`
    var googletag = googletag || {};
    googletag.cmd = googletag.cmd || [];
    googletag.cmd.push(function () {
      googletag.pubads().disableInitialLoad();
    });
    pbjs.que.push(function () {
      pbjs.setConfig({ enableTIDs: true });
      pbjs.addAdUnits(window.allAdUnits || []);
      pbjs.requestBids({ bidsBackHandler: sendAdServerRequest });
    });
    function sendAdServerRequest() {
      googletag.cmd.push(function () {
        pbjs.que.push(function () {
          window.allAdUnits.forEach(function(adUnit) {
            pbjs.setTargetingForGPTAsync(adUnit.code);
          });
          googletag.pubads().refresh();
        });
      });
    }
    ${debugLogCode}
  `);
}
function loadDefineSlot() {
	debugLog("🎰 Определяем слоты для Google Ad Manager...");
	const adsContainers = document.querySelectorAll("#ads-wrapper[data-ad-id]");
	debugLog("🎰 Найдено контейнеров с data-ad-id:", adsContainers.length);

	const isDebugMode = localStorage.getItem("adsDebug") === "true";
	const defineSlotCode = Array.from(adsContainers)
		.map((container) => {
			const adId = container.getAttribute("data-ad-id");
			if (!adId) return "";
			debugLog("🎰 Создаем слот для ID:", adId);

			return `
        ${isDebugMode ? `console.log('🎰 Google Tag: определяем слот для ${adId}');` : ""}
        const slot_${adId.replace(/-/g, "_")} = googletag
          .defineSlot('/19968336/header-bid-tag-0', ${JSON.stringify(AD_SIZES)}, '${adId}')
          .addService(googletag.pubads());
        ${isDebugMode ? `console.log('✅ Google Tag: слот для ${adId} создан');` : ""}
      `;
		})
		.filter((code) => code !== "")
		.join("");

	const debugLogCode = isDebugMode
		? `console.log('🎰 Google Tag: все слоты определены и сервисы включены');`
		: "";

	return appendScriptWithCode(`
    googletag.cmd.push(function () {
      ${defineSlotCode}
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
      ${debugLogCode}
    });
  `);
}
function loadDisplaySlot() {
	debugLog("📺 Отображаем рекламные слоты...");
	const adsContainers = document.querySelectorAll("#ads-wrapper[data-ad-id]");
	debugLog("📺 Найдено контейнеров с data-ad-id:", adsContainers.length);

	const isDebugMode = localStorage.getItem("adsDebug") === "true";
	let processedCount = 0;

	adsContainers.forEach((container) => {
		const containerElement = container as Element;
		const adId = containerElement.getAttribute("data-ad-id");

		if (!adId || processedElements.has(containerElement)) {
			debugLog("⏭️ Пропускаем контейнер (уже обработан или нет ID)");
			return;
		}

		debugLog("📺 Обрабатываем контейнер с adId:", adId);
		processedElements.add(containerElement);

		containerElement.innerHTML = "";

		const div = document.createElement("div");
		div.id = adId;
		div.style.cssText =
			"width: 300px; height: 250px; border: 1px solid #ddd; background-color: #f5f5f5; margin: 0 auto;";

		const script = document.createElement("script");
		script.innerHTML = `
      googletag.cmd.push(function() { 
        ${isDebugMode ? `console.log('📺 Google Tag: отображаем слот ${adId}');` : ""}
        googletag.display('${adId}'); 
        ${isDebugMode ? `console.log('✅ Google Tag: команда отображения отправлена для ${adId}');` : ""}
      });
    `;

		div.appendChild(script);
		containerElement.appendChild(div);
		processedCount++;

		debugLog("✅ Слот создан и добавлен в DOM для adId:", adId);
	});

	debugLog(
		`📺 Обработано ${processedCount} новых контейнеров из ${adsContainers.length} найденных`,
	);
	return Promise.resolve();
}

function runAllAdsSequence() {
	debugLog(
		"🚀 Запускаем последовательность загрузки рекламы через 2 секунды...",
	);
	setTimeout(() => {
		debugLog("⏰ 2 секунды прошло, начинаем цепочку загрузки рекламы");
		loadAdtelligentBidAdapter()
			.catch((err) => {
				debugWarn(
					"⚠️ AdtelligentBidAdapter не загрузился, продолжаем без него:",
					err.message,
				);
				return Promise.resolve();
			})
			.then(() => {
				debugLog("✅ Цепочка: AdtelligentBidAdapter завершен (или пропущен)");
				return loadGoogleScript();
			})
			.then(() => {
				debugLog("✅ Цепочка: GoogleScript завершен");
				return loadPbjsScript();
			})
			.then(() => {
				debugLog("✅ Цепочка: PbjsScript завершен");
				return loadGoogletag();
			})
			.then(() => {
				debugLog("✅ Цепочка: Googletag завершен");
				return loadDefineSlot();
			})
			.then(() => {
				debugLog("✅ Цепочка: DefineSlot завершен");
				return loadDisplaySlot();
			})
			.then(() => {
				debugLog("🎉 ВСЯ РЕКЛАМА ЗАГРУЖЕНА УСПЕШНО!");
			})
			.catch((err) => {
				debugError("❌ Критическая ошибка при загрузке рекламных скриптов:");
				debugError("Тип ошибки:", err.constructor.name);
				debugError("Сообщение ошибки:", err.message);
				debugError("Полный объект ошибки:", err);

				if (err.message && err.message.includes("googletagservices.com")) {
					debugError("🔧 Проблема: Не удалось загрузить Google Tag Services");
					debugError(
						"💡 Возможные причины: блокировка рекламы, проблемы с сетью",
					);
				}
			});
	}, 2000);
}

runAllAdsSequence();
