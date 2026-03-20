
import { getUnits, getConversion } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {

    attachEventListeners();
    await loadUnits("Length");
});

// ---------------- EVENTS ----------------

function attachEventListeners() {

    // TYPE CHANGE
    const typeRadios = document.querySelectorAll('input[name="type"]');

    typeRadios.forEach(radio => {
        radio.addEventListener("change", async (e) => {
            const selectedType = capitalize(e.target.id);
            await loadUnits(selectedType);
        });
    });

    // INPUT CHANGE
    const inputs = document.querySelectorAll(".box input");
    const selects = document.querySelectorAll(".box select");

    inputs.forEach(input => {
        input.addEventListener("input", performConversion);
    });

    selects.forEach(select => {
        select.addEventListener("change", performConversion);
    });
}

// ---------------- LOAD UNITS ----------------

async function loadUnits(type) {
    try {
        const data = await getUnits(type);

        const selects = document.querySelectorAll(".box select");

        selects.forEach(select => {
            select.innerHTML = "";

            data.forEach(unit => {
                const option = document.createElement("option");
                option.value = unit.symbol;
                option.textContent = unit.label;
                select.appendChild(option);
            });
        });

        performConversion();

    } catch (error) {
        alert("Server unavailable");
        console.error(error);
    }
}

// ---------------- CONVERSION ----------------

async function performConversion() {
    try {
        const inputs = document.querySelectorAll(".box input");
        const selects = document.querySelectorAll(".box select");

        const fromVal = parseFloat(inputs[0].value);
        const fromUnit = selects[0].value;
        const toUnit = selects[1].value;

        if (!fromVal && fromVal !== 0) return;

        // SAME UNIT
        if (fromUnit === toUnit) {
            inputs[1].value = fromVal;
            return;
        }

        const conversion = await getConversion(fromUnit, toUnit);

        let result;

        // FACTOR
        if (conversion.factor !== null) {
            result = fromVal * conversion.factor;
        }
        // FORMULA
        else if (conversion.formula) {
            const x = fromVal;
            result = Function("x", `return ${conversion.formula}`)(x);
        }

        inputs[1].value = result;

    } catch (error) {
        alert("Conversion not available for this pair");
        console.error(error);
    }
}

// ---------------- HELPERS ----------------

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}