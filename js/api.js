const BASE_URL = "http://localhost:3000";

export async function getUnits(type) {
    try {
        const res = await fetch(`${BASE_URL}/units?type=${type}`);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("API Error (getUnits):", error);
        return [];
    }
}


export async function getConversion(from, to) {
    try {

        // SAME UNIT CASE
        if (from === to) {
            return {
                from,
                to,
                factor: 1,
                formula: null
            };
        }

        const res = await fetch(
            `${BASE_URL}/conversions?from=${from}&to=${to}`
        );

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json(); // always array

        if (!data.length) {
            throw new Error("No conversion found");
        }

        return data[0];

    } catch (error) {
        console.error("API Error (getConversion):", error);
        throw error;
    }
}
export async function saveHistory(record) {
    try {
        const res = await fetch(`${BASE_URL}/history`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(record)
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to save history:", error);
    }
}
export async function getHistory() {
    try {
        const res = await fetch("http://localhost:3000/history");

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("History Load Failed:", error);
        return []; // as per use case
    }
}