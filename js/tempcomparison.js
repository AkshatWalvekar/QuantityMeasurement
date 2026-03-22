export function compareValues(v1, u1, v2, u2, base1, base2) {

    // invalid values
    if (!Number.isFinite(v1) || !Number.isFinite(v2)) {
        return "Invalid values — cannot compare";
    }

    // SAME UNIT (no normalization needed)
    if (u1 === u2) {
        if (v1 > v2) {
            return `${v1} ${u1} is GREATER than ${v2} ${u2}`;
        }
        if (v1 < v2) {
            return `${v1} ${u1} is LESS than ${v2} ${u2}`;
        }
        return `${v1} ${u1} is EQUAL to ${v2} ${u2}`;
    }

    //  NORMALIZED COMPARISON (base units)
    if (base1 > base2) {
        return `${v1} ${u1} is GREATER than ${v2} ${u2}`;
    }

    if (base1 < base2) {
        return `${v1} ${u1} is LESS than ${v2} ${u2}`;
    }

    return `${v1} ${u1} is EQUAL to ${v2} ${u2}`;
}