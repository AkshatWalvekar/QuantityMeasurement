Use Case ID : UC-JS-14

Name : Render History List

Actor : End User

Trigger : loadHistory() returns data OR new record saved

Preconditions : #history-list exists in DOM.

Postconditions : History list shows all records newest-first. Empty state shows placeholder.

Main Flow

function renderHistory(records) { }

const list = document.querySelector("#history-list")

list.innerHTML = ""

if (!records.length) { list.innerHTML = "

No history yet.
"; return }
records.forEach(r => {

const li = document.createElement("li")

li.textContent = ${r.expression}  =  ${r.result}  (${new Date(r.timestamp).toLocaleString()})

list.appendChild(li) })
