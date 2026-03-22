Use Case ID : UC-JS-16

Name : Handle Action Tab Click

Actor : End User

Trigger : User clicks an action tab

Preconditions : Event listeners attached.

Postconditions : state.action updated. Operator row shown/hidden. Result cleared.

Main Flow

querySelectorAll(".action-btn").forEach(btn => btn.addEventListener("click", () => {

state.action = btn.dataset.action

setActive(actionSelector, btn, ".action-btn")

toggleOperators(state.action === "Arithmetic")

showResult(0, "") })
