UC-JS-10 Populate Unit Dropdown : Fill a with unit options after getUnits() Use Case ID : UC-JS-10 Name : Populate Unit Dropdown Actor : End User Trigger : getUnits() returns data Preconditions : selectEl is a valid element. units is an array.

Postconditions : Dropdown contains one per unit plus a disabled default prompt.

Main Flow

function populateDropdown(selectEl, units) { }

selectEl.innerHTML = ""

Append disabled+selected default option: "-- Select Unit --"

units.forEach(u => {

const opt = document.createElement("option")

opt.value = u.symbol

opt.textContent = ${u.label} (${u.symbol})

selectEl.appendChild(opt) })
