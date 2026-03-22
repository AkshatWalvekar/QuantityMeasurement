UC-JS-09 Arithmetic Operation : Apply +/−/×/÷ after normalising TO value to FROM unit

Use Case ID : UC-JS-09

Name : Perform Arithmetic Between Two Measurements

Actor : System

Trigger : Action is Arithmetic; all inputs and operator valid

Preconditions : v2 already converted to FROM unit by caller before passing here.

Postconditions : Returns numeric result in FROM unit.

Main Flow

1.function performArithmetic(v1, v2normalised, op) { }

2.switch(op):

"+": return parseFloat((v1 + v2normalised).toFixed(6))

"-": return parseFloat((v1 - v2normalised).toFixed(6))

"*": return parseFloat((v1 * v2normalised).toFixed(6))

"/": if (v2normalised === 0) throw Error("Divide by zero")

 return parseFloat((v1 / v2normalised).toFixed(6))
 
3.default: throw Error("Unknown operator")
