UC-JS-03 Fetch Units by Type

GET /units?type=X from json-server

Use Case ID

UC-JS-03

Name

Fetch Units for Selected Type

Actor

System — api.js called by app.js

Trigger

User clicks a type card OR app initialises

Preconditions

json-server running. "units" collection is populated.

Postconditions

Returns array of unit objects for the requested type.

Main Flow

export async function getUnits(type) { }

const res = await fetch(http://localhost:3000/units?type=${type})

if (!res.ok) throw new Error(HTTP ${res.status})

return await res.json()

Alternate Flow

Empty array returned if no units exist for that type.

Exception Flow

Network error: catch block fires. Caller receives null/empty and shows error banner.

Your Task

Define BASE_URL = "http://localhost:3000" at the top of api.js.

Use query param ?type= to filter on the server side — do not filter on the client.

Always check res.ok before calling res.json().
