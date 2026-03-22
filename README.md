Use Case ID : UC-JS-01

Name : Create JSON Server Database

Actor End User

Trigger : Developer sets up the project for the first time

Preconditions : json-server is installed globally (npm install -g json-server)

Postconditions : Running "json-server --watch db.json --port 3000" exposes all three collections

Main Flow

Create db.json at project root.

Add "units" array with objects: { id, type, label, symbol }.

Add "conversions" array with objects: { id, from, to, factor, formula }.

Add "history" array — start empty: [].

Verify GET http://localhost:3000/units returns the full array.
