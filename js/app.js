import { compareValues } from "./tempcomparison.js";
import { convertValue } from "./conversion.js";
import { getUnits, saveHistory, getHistory } from "./api.js";

let isUserTyping = false;
let currentType = "Length";
let lastResult = "";
let lastValue = "";   // NEW (store input)
let isLoadingUnits = false;

// INIT
document.addEventListener("DOMContentLoaded", async () => {
    attachEventListeners();
    await loadUnits(currentType);
    loadHistory();

});

// EVENTS
function attachEventListeners() {

    const fromInput = document.querySelectorAll(".box input")[0];
    const toInput = document.querySelectorAll(".box input")[1];

    // FROM input (already there)
    fromInput.addEventListener("input", () => {
        isUserTyping = true;
        lastValue = fromInput.value;
        handleConversion();
    });

   
    toInput.addEventListener("input", () => {
        handleConversion();
    });

    const typeRadios = document.querySelectorAll('input[name="type"]');

    typeRadios.forEach(radio => {
        radio.addEventListener("change", async (e) => {

            const selectedType = capitalize(e.target.id);

            if (selectedType === currentType) return;

            currentType = selectedType;

            await loadUnits(selectedType);

            // restore values
            const fromInput = document.querySelectorAll(".box input")[0];
            const toInput = document.querySelectorAll(".box input")[1];

            if (lastValue !== "") {
                fromInput.value = lastValue;
            }

            if (lastResult !== "") {
                toInput.value = lastResult;
            }
        });
    });
}

// LOAD UNITS
async function loadUnits(type) {

    isLoadingUnits = true;

    const units = await getUnits(type);

    if (!units || units.length === 0) {
        alert("No units found");
        isLoadingUnits = false;
        return;
    }

    const selects = document.querySelectorAll(".box select");

    selects.forEach((select) => {
        select.innerHTML = "";

        units.forEach(unit => {
            const option = document.createElement("option");
            option.value = unit.symbol;
            option.textContent = unit.label;
            select.appendChild(option);
        });
    });

    isLoadingUnits = false;
}

// CONVERSION
async function handleConversion() {

    if (isLoadingUnits) return;

    const fromInput = document.querySelectorAll(".box input")[0];
    const toInput = document.querySelectorAll(".box input")[1];

    const fromSelect = document.querySelectorAll(".box select")[0];
    const toSelect = document.querySelectorAll(".box select")[1];

    const selectedAction = document.querySelector('input[name="action"]:checked').id;
    const selectedType = capitalize(
        document.querySelector('input[name="type"]:checked').id
    );

    const fromUnit = fromSelect.value;
    const toUnit = toSelect.value;

    const v1 = parseFloat(fromInput.value);
    const v2 = parseFloat(toInput.value);

    // STOP if empty
    if (!fromUnit || !toUnit) return;


    if (selectedAction === "comparison") {

        if (!Number.isFinite(v1) || !Number.isFinite(v2)) {
            return; // wait until both values entered
        }

        const baseUnitMap = {
            Length: "m",
            Weight: "kg",
            Temperature: "C",
            Volume: "L"
        };

        const baseUnit = baseUnitMap[selectedType];

        const base1 = await convertValue(v1, fromUnit, baseUnit);
        const base2 = await convertValue(v2, toUnit, baseUnit);

        const result = compareValues(v1, fromUnit, v2, toUnit, base1, base2);

        // SHOW RESULT (do NOT overwrite inputs)
        document.getElementById("resultText").textContent = result;

        return; 
    }

    
    const value = parseFloat(fromInput.value);

    if (isNaN(value)) {
        if (lastResult !== "") {
            toInput.value = lastResult;
        }
        return;
    }

    const result = await convertValue(value, fromUnit, toUnit);

    if (result !== null) {

        const finalResult = parseFloat(result.toFixed(4));

        lastResult = finalResult;
        lastValue = value;

        // show result
        toInput.value = finalResult;

        if (!isUserTyping) return;

        const record = {
            type: selectedType,
            action: capitalize(selectedAction),
            expression: `${value} ${fromUnit} → ${toUnit}`,
            result: finalResult,
            timestamp: new Date().toISOString()
        };

        try {
            await saveHistory(record);
            loadHistory();
        } catch (error) {
            console.error("History save failed:", error);
        }

        isUserTyping = false;
    }
}
// HELPER
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
async function loadHistory() {

    const container = document.getElementById("historyContainer");

    if (!container) return; // safety

    const history = await getHistory();

    if (!history || history.length === 0) {
        container.innerHTML = "<p>No history yet.</p>";
        return;
    }

    container.innerHTML = "";

    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.textContent = `${item.expression} = ${item.result}`;
        container.appendChild(div);
    });
}