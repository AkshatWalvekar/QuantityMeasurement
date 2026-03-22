Use Case ID : UC-JS-17

Name : Execute Calculation

Actor : End User

Trigger : Any input or dropdown changes and all required fields are filled

Preconditions : State has valid values for the current action mode.

Postconditions : Result displayed. Record saved. History refreshed.

Main Flow

1.async function calculate() { try {

2.if (state.action === "Conversion") {

const conv = await getConversion(state.fromUnit, state.toUnit)

const res = applyConversion(state.fromVal, conv)

showResult(res, state.toUnit) }

3.else if (state.action === "Comparison") {

// convert both to base, call compareValues(), showResult(sentence, "") }

4.else { // Arithmetic

// normalise toVal to fromUnit, call performArithmetic(), showResult() }

5.const record = { type:state.type, action:state.action, expression:..., result:..., timestamp: new Date().toISOString() }

6.await saveHistory(record)

7.renderHistory(await getHistory())

} catch(e) { showResult("Error: " + e.message, "") } }
