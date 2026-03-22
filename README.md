Use Case ID : UC-JS-13

Name : Toggle Operator Row

Actor : End User

Trigger : User clicks an action tab

Preconditions : #operator-selector exists in DOM.

Postconditions : Operator row visible if and only if action is "Arithmetic".

Main Flow

function toggleOperators(show) { }

document.querySelector("#operator-selector").style.display = show ? "flex" : "none"
