const BASE_URL = "http://localhost:3000";

// UC3
export async function getUnits(type) {
    try {
        const res = await fetch(`${BASE_URL}/units?type=${type}`);
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return [];
    }
}

// UC4
export async function getConversion(from, to) {
    const res = await fetch(`${BASE_URL}/conversions?from=${from}&to=${to}`);
    const data = await res.json();

    if (!data.length) throw new Error("No conversion");

    return data[0];
}

// UC5
export async function saveHistory(record) {
    try {
        await fetch(`${BASE_URL}/history`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record)
        });
    } catch (err) {
        console.error("Save history failed");
    }
}