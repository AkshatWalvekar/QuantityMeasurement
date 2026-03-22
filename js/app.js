import { getUnits, getConversion, saveHistory, getHistory } from "./api.js";

let currentType = "Length";
let lastSaved = "";

document.addEventListener("DOMContentLoaded", async () => {
    attachEventListeners();
    await loadUnits(currentType);
    await loadHistory();
});

// EVENTS
function attachEventListeners() {

    // TYPE SWITCH
    document.querySelectorAll('input[name="type"]').forEach(radio => {
        radio.addEventListener("change", async (e) => {

            currentType = capitalize(e.target.id);

            await loadUnits(currentType);

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

    inputs[0].addEventListener("input", performConversion);

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

        loadHistory(); // refresh UI

    } catch (err) {
        console.error(err);
    }
}

// LOAD HISTORY
async function loadHistory() {
    try{
    const history = await getHistory();

    console.log("History:",history);

    const list = document.getElementById("history-list");
    const empty = document.getElementById("no-history");

    if(!list||!empty)return;

    list.innerHTML = "";

    if (!history.length) {
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";

    history.reverse().forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.expression} = ${item.result}`;
        list.appendChild(li);
    });
}catch(err){
    console.error("Load History Error;",err);
}
}

// HELPERS
function setSelectedType(type) {
    const radio = document.getElementById(type.toLowerCase());
    if (radio) radio.checked = true;
}

function capitalize(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
}