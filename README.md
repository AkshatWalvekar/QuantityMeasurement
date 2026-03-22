UC-JS-08 Compare Two Values : Normalise both to base unit, then compare

Use Case ID : UC-JS-08

Name : Compare Two Measurement Values

Actor : System

Trigger : Action is Comparison; all four inputs valid

Preconditions : Both values are converted to base unit before calling this function.

Postconditions : Returns a human-readable comparison sentence.

Main Flow

1.function compareValues(v1, u1, v2, u2, base1, base2) { }

2.if (base1 > base2) return ${v1} ${u1} is GREATER than ${v2} ${u2}

3.if (base1 < base2) return ${v1} ${u1} is LESS than ${v2} ${u2}

4.return ${v1} ${u1} is EQUAL to ${v2} ${u2}
