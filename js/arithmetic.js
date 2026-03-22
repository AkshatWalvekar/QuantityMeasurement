export function performArithmetic(v1, v2normalised, op) {

    if (!Number.isFinite(v1) || !Number.isFinite(v2normalised)) {
        throw new Error("Invalid values");
    }

    switch (op) {

        case "+":
            return parseFloat((v1 + v2normalised).toFixed(6));

        case "-":
            return parseFloat((v1 - v2normalised).toFixed(6));

        case "*":
            return parseFloat((v1 * v2normalised).toFixed(6));

        case "/":
            if (v2normalised === 0) {
                throw new Error("Divide by zero");
            }
            return parseFloat((v1 / v2normalised).toFixed(6));

        default:
            throw new Error("Unknown operator");
    }
}