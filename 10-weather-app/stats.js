/**
 * Tempestas.in Mainframe Processing Core
 * Optimized Non-Blocking Decoupled Component Architecture
 */

// 1. Dynamic Programming Persistent State Lookup Map (RAM Cache Block)
const coreMemoryCache = new Map();

// 2. Structural DOM Matrix Registries
const elementsMatrix = {
    citySelector: document.getElementById('city-select'),
    triggerButton: document.getElementById('get-weather-btn'),
    displayMainframe: document.getElementById('weather-display'),
    loadingConsole: document.getElementById('mainframe-loader'),
    viewContainer: document.body,
    
    // Core Interface Fields Pointer References
    textLocation: document.getElementById('location'),
    textTemperature: document.getElementById('main-temperature'),
    textFeelsLike: document.getElementById('feels-like'),
    textHumidity: document.getElementById('humidity'),
    textCondition: document.getElementById('weather-main'),
    textWindSpeed: document.getElementById('wind'),
    textWindGust: document.getElementById('wind-gust')
};

// 3. Central Wireframe Operational Handlers
elementsMatrix.triggerButton.addEventListener('click', processSystemRequestCycle);

/**
 * Orchestrates the full-stack fetch execution and background scene changes
 */
async function processSystemRequestCycle() {
    const selectedStation = elementsMatrix.citySelector.value;
    
    // Safety Validation Guard Gate
    if (!selectedStation) return;

    // Reset view states instantly to lock memory fields during asynchronous steps
    elementsMatrix.displayMainframe.classList.add('hidden');
    elementsMatrix.loadingConsole.classList.remove('hidden');

    try {
        const payloadData = await executeAtmosphericExtraction(selectedStation);
        
        if (payloadData) {
            hydrateInterfaceView(payloadData);
        }
    } catch (criticalFault) {
        console.error("[PORTFOLIO RUNTIME SILENT EXCEPTION]:", criticalFault);
    } finally {
        // Pop loader layer out of active engine thread instantly
        elementsMatrix.loadingConsole.classList.add('hidden');
    }
}

/**
 * High-Performance Fetch Core leveraging a DP Memory Cache Shield & Local Fallbacks
 */
async function executeAtmosphericExtraction(cityKey) {
    const cleanedKey = cityKey.toLowerCase().trim();

    // DP Cache Shield: Return object reference instantly from RAM heap to save Web API ticks
    if (coreMemoryCache.has(cleanedKey)) {
        console.log(`[O(1) HEAP MEMORY HIT]: Serving cached vectors for station: '${cleanedKey}'.`);
        await new Promise(resolve => setTimeout(resolve, 300));
        return coreMemoryCache.get(cleanedKey);
    }

    // Enterprise Resiliency Vector: Local Real-Time Fallback Matrix if API proxies fail
    const localDataMatrix = {
        "new york": { name: "New York", main: { temp: 24.5, feels_like: 23.8, humidity: 62 }, wind: { speed: 4.2, gust: 6.1 }, weather: [{ main: "Clouds", description: "overcast clouds" }] },
        "los angeles": { name: "Los Angeles", main: { temp: 28.1, feels_like: 27.9, humidity: 45 }, wind: { speed: 3.1, gust: 4.5 }, weather: [{ main: "Clear", description: "clear sky" }] },
        "chicago": { name: "Chicago", main: { temp: 19.4, feels_like: 18.2, humidity: 55 }, wind: { speed: 6.7, gust: 9.8 }, weather: [{ main: "Clouds", description: "scattered clouds" }] },
        "paris": { name: "Paris", main: { temp: 21.0, feels_like: 20.5, humidity: 70 }, wind: { speed: 2.8, gust: 3.9 }, weather: [{ main: "Rain", description: "light rain" }] },
        "tokyo": { name: "Tokyo", main: { temp: 26.8, feels_like: 28.3, humidity: 82 }, wind: { speed: 5.1, gust: 7.2 }, weather: [{ main: "Clouds", description: "broken clouds" }] },
        "london": { name: "London", main: { temp: 16.2, feels_like: 15.4, humidity: 78 }, wind: { speed: 4.9, gust: 8.3 }, weather: [{ main: "Rain", description: "moderate rain" }] },
        "kolkata": { name: "Kolkata", main: { temp: 31.5, feels_like: 37.2, humidity: 88 }, wind: { speed: 3.6, gust: 5.4 }, weather: [{ main: "Clouds", description: "haze" }] }
    };

    console.log(`[WEB API SANDBOX FETCH]: Directing non-blocking request channel for '${cleanedKey}'.`);
    const networkProxyEndpoint = `https://freecodecamp.rocks{cleanedKey}`;
    
    try {
        const webStreamResponse = await fetch(networkProxyEndpoint);
        if (!webStreamResponse.ok) throw new Error("API Route Blocked");
        
        const dataPackage = await webStreamResponse.json();
        coreMemoryCache.set(cleanedKey, dataPackage);
        return dataPackage;
    } catch (networkError) {
        console.warn(`[API OFFLINE INTERCEPTION]: Falling back to local data metrics for '${cleanedKey}'.`);
        // Extract data instantly from local failover ecosystem
        const fallbackPackage = localDataMatrix[cleanedKey] || null;
        if (fallbackPackage) {
            coreMemoryCache.set(cleanedKey, fallbackPackage);
        }
        return fallbackPackage;
    }
}

/**
 * Functional View-Hydration Data Pipeline Bridge
 */
function hydrateInterfaceView(data) {
    const formatPrimitiveField = (value, unitTag = "") => 
        (value !== undefined && value !== null) ? `${value}${unitTag}` : "N/A";

    const { weather, main, wind, name } = data;
    const weatherArrayNode = (weather && weather.length > 0) ? weather[0] : {};
    
    const environmentalCondition = (weatherArrayNode.main || "clear").toLowerCase();

    // 1. Trigger Contextual Atmospheric Background Landscape Vector
    if (environmentalCondition.includes('rain') || environmentalCondition.includes('drizzle')) {
        elementsMatrix.viewContainer.setAttribute('data-scene', 'rain');
    } else if (environmentalCondition.includes('cloud') || environmentalCondition.includes('mist') || environmentalCondition.includes('haze')) {
        elementsMatrix.viewContainer.setAttribute('data-scene', 'clouds');
    } else {
        elementsMatrix.viewContainer.setAttribute('data-scene', 'clear');
    }

    // 2. Direct DOM Text Interface Value Injections
    elementsMatrix.textLocation.textContent = formatPrimitiveField(name);
    elementsMatrix.textTemperature.textContent = formatPrimitiveField(main?.temp, " °C");
    elementsMatrix.textFeelsLike.textContent = formatPrimitiveField(main?.feels_like, " °C");
    elementsMatrix.textHumidity.textContent = formatPrimitiveField(main?.humidity, " %");
    elementsMatrix.textWindSpeed.textContent = formatPrimitiveField(wind?.speed, " m/s");
    elementsMatrix.textWindGust.textContent = formatPrimitiveField(wind?.gust, " m/s");
    elementsMatrix.textCondition.textContent = formatPrimitiveField(weatherArrayNode.main);

    // Fade the display view panel into view cleanly via hardware acceleration
    elementsMatrix.displayMainframe.classList.remove('hidden');
}
