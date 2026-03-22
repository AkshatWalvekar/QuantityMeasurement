UC-JS-04 Fetch Conversion Record GET /conversions?from=X&to=Y

Use Case ID: UC-JS-04

Name : Fetch Conversion Record for Unit Pair

Actor : System — api.js called by conversion.js

Trigger : Calculation requires a factor or formula for a unit pair

Preconditions : Conversion entry exists in db.json for the given pair.

Postconditions : Returns a single conversion object { from, to, factor, formula }.

Main Flow

1.export async function getConversion(from, to) { }

2.const res = await fetch(${BASE_URL}/conversions?from=${from}&to=${to})

3.const data = await res.json() // json-server returns array even for one result

4.if (!data.length) throw new Error("No conversion found")

5.return data[0]
