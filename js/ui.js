export function populateDropdown(selectEl, units) {

    // safety check
    if (!selectEl) {
        console.warn("populateDropdown: select element not found");
        return;
    }

    // clear existing options
    selectEl.innerHTML = "";

    // default option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "-- Select Unit --";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectEl.appendChild(defaultOption);

    // if empty array → only default
    if (!units || units.length === 0) {
        return;
    }

    // populate units
    units.forEach(u => {
        const opt = document.createElement("option");
        opt.value = u.symbol;
        opt.textContent = `${u.label} (${u.symbol})`;
        selectEl.appendChild(opt);
    });
}
export function setActive(parentEl, clickedEl, childSelector) {

    // safety
    if (!parentEl) return;

    // remove active from all children
    parentEl.querySelectorAll(childSelector).forEach(el => {
        el.classList.remove("active");
    });

    // add active to clicked
    clickedEl.classList.add("active");
}