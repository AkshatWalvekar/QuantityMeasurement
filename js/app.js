import { getUnits, getConversion, saveHistory } from "./api.js";

let currentType = "Length";
let lastSaved = "";

document.addEventListener("DOMContentLoaded", async () => {
    attachEventListeners();
    await loadUnits(currentType);
});

// EVENTS
function attachEventListeners() {

    // TYPE SWITCH
    document.querySelectorAll('input[name="type"]').forEach(radio => {
        radio.addEventListener("change", async (e) => {

            currentType = capitalize(e.target.id);

            await loadUnits(currentType);

            // keep selected radio
            setSelectedType(currentType);

            const inputs = document.querySelectorAll(".box input");
            inputs[0].value = 1;
            inputs[1].value = "";
        });
    });

    // ACTION SWITCH
    document.querySelectorAll('input[name="action"]').forEach(radio => {
        radio.addEventListener("change", (e) => {
            if (e.target.id !== "conversion") {
                alert("Only Conversion implemented");
            }
        });
    });

    const inputs = document.querySelectorAll(".box input");

    // FROM input → conversion + save
    inputs[0].addEventListener("input", performConversion);

    // SELECT change → conversion only
    document.querySelectorAll(".box select").forEach(s => {
        s.addEventListener("change", performConversion);
    });
}

// LOAD UNITS
async function loadUnits(type) {
    const units = await getUnits(type);

    const selects = document.querySelectorAll(".box select");

    selects.forEach(select => {
        select.innerHTML = "";

        units.forEach(u => {
            const opt = document.createElement("option");
            opt.value = u.symbol;
            opt.textContent = u.label;
            select.appendChild(opt);
        });
    });

    // keep correct radio selected
    setSelectedType(type);
}

// CONVERSION + SAVE
async function performConversion() {
    try {
        const inputs = document.querySelectorAll(".box input");
        const selects = document.querySelectorAll(".box select");

        const value = parseFloat(inputs[0].value);
        const from = selects[0].value;
        const to = selects[1].value;

        if (!from || !to || isNaN(value)) return;

        let result;

        if (from === to) {
            result = value;
        } else {
            const conv = await getConversion(from, to);

            if (conv.factor !== null) {
                result = value * conv.factor;
            } else {
                const x = value;
                result = Function("x", `return ${conv.formula}`)(x);
            }
        }

        inputs[1].value = result;

        // prevent duplicate save
        const key = `${value}-${from}-${to}-${result}`;
        if (key === lastSaved) return;

        lastSaved = key;

        await saveHistory({
            type: currentType,
            action: "Conversion",
            expression: `${value} ${from} → ${to}`,
            result: result,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error(err);
    }
}

// HELPER: keep radio selected
function setSelectedType(type) {
    const radio = document.getElementById(type.toLowerCase());
    if (radio) radio.checked = true;
}

// HELPER
function capitalize(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
}