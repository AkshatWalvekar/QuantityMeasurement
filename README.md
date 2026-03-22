Use Case ID : UC-JS-15

Name : Handle Type Card Click

Actor : End User

Trigger : User clicks a type card

Preconditions : Event listeners attached.

Postconditions : State updated. Dropdowns repopulated. Inputs + result cleared.

Main Flow

1.querySelectorAll(".type-card").forEach(card => card.addEventListener("click", async () => {

2.state.type = card.dataset.type

3.setActive(typeSelector, card, ".type-card")

4.fromInput.value = ""; toInput.value = ""; showResult(0, "")

5.const units = await getUnits(state.type)

6.populateDropdown(fromSelect, units)

7.populateDropdown(toSelect, units)

8.state.fromUnit = ""; state.toUnit = "" }))
