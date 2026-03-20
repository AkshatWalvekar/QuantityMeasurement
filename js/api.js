const BASE_URL = "http://localhost:3000";

// UC-JS-03: Fetch Units by Type
export async function getUnits(type) {
    try {
        const res = await fetch(`${BASE_URL}/units?type=${type}`);

        // Check HTTP error
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        return data;

    } catch (error) {
        console.error("API Error (getUnits):", error);
        return []; // return empty array instead of breaking app
    }
}