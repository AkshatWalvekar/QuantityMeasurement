document.addEventListener("DOMContentLoaded", async () => {
 
    // STATE OBJECT
    const state = {
        type: "Length",
        action: "Conversion",
        fromVal: null,
        fromUnit: "",
        toVal: null,
        toUnit: "",
        operator: "+"
    };
 
    // INITIAL CALLS
    attachEventListeners();
    await loadUnits("Length");
    toggleOperators(false);
    loadHistory();
 
});
function attachEventListeners() {
 
    // TYPE CHANGE
    const typeRadios = document.querySelectorAll('input[name="type"]');
 
    typeRadios.forEach(radio => {
        radio.addEventListener("change", async (e) => {
            const selectedType = e.target.id;
            await loadUnits(capitalize(selectedType));
        });
    });
 
    // ACTION CHANGE
    const actionRadios = document.querySelectorAll('input[name="action"]');
 
    actionRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            const action = e.target.id;
 
            if (action === "arithmetic") {
                toggleOperators(true);
            } else {
                toggleOperators(false);
            }
        });
    });
}
async function loadUnits(type) {
    try {
        const res = await fetch("http://localhost:3000/units");
        const data = await res.json();
 
        const filtered = data.filter(u => u.type === type);
 
        const selects = document.querySelectorAll(".box select");
 
        selects.forEach(select => {
            select.innerHTML = "";
 
            filtered.forEach(unit => {
                const option = document.createElement("option");
                option.value = unit.symbol;
                option.textContent = unit.label;
                select.appendChild(option);
            });
        });
 
    } catch (error) {
        alert("Server unavailable");
        console.error(error);
    }
}
function toggleOperators(show) {
    const operatorRow = document.getElementById("operator-row");
 
    if (!operatorRow) return;
 
    operatorRow.style.display = show ? "flex" : "none";
}
async function loadHistory() {
    try {
        const res = await fetch("http://localhost:3000/history");
        const history = await res.json();
 
        console.log("History:", history);
 
        // Later you will render it in UI
 
    } catch (error) {
        console.error("Error loading history", error);
    }
}
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}