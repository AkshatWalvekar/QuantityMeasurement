UC-JS-07 Apply Conversion : Multiply by factor OR evaluate formula string

Use Case ID : UC-JS-07

Name : Apply Conversion Factor or Formula

Actor : System

Trigger : Action is Conversion; all inputs valid

Preconditions : value is a finite number. convObj has either factor (number) or formula (string).

Postconditions : Returns the converted number rounded to 6 decimal places.

Main Flow

1.function applyConversion(value, convObj) { }

2.if (convObj.factor !== null)

return parseFloat((value * convObj.factor).toFixed(6))

3.else (formula path):

const expr = convObj.formula.replace("x", value)

return parseFloat(eval(expr).toFixed(6))
