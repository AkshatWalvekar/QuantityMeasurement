Use Case ID : UC-JS-05

Name : Save Calculation Record to History

Actor : System — called after every successful calculation

Trigger : A calculation completes without error

Preconditions : Record object prepared with: type, action, expression, result, timestamp.

Postconditions : Record persisted in db.json. json-server returns object with auto-assigned id.

Main Flow

1.export async function saveHistory(record) { }

2.const res = await fetch(${BASE_URL}/history, {

method: "POST",

headers: { "Content-Type": "application/json" },

body: JSON.stringify(record)

})

3.return await res.json()
