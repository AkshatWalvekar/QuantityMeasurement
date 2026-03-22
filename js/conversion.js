import { getConversion } from "./api.js";


function applyConversion(value, convObj) {

    // invalid number
    if (!Number.isFinite(value)) {
        throw new Error("Invalid number");
    }

    // SAME UNIT
    if (convObj.from === convObj.to) {
        return value;
    }

    // FACTOR CASE
    if (convObj.factor !== null) {
        return parseFloat((value * convObj.factor).toFixed(6));
    }

    // FORMULA CASE
    if (convObj.formula) {
        try {
            const expr = convObj.formula.replace(/x/g, value);
            return parseFloat(eval(expr).toFixed(6));
        } catch (error) {
            throw new Error("Bad formula");
        }
    }

    throw new Error("Invalid conversion object");
}
export async function convertValue(value, from, to) {
    try {

        const conversion = await getConversion(from, to);

        
        return applyConversion(value, conversion);

    } catch (error) {
        alert("Conversion not available for this pair");
        console.error(error);
        return null;
    }
}