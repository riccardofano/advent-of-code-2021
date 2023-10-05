export function partOne(input: string): number | null {
    const positions = input.trim().split(",").map(Number);
    const max = Math.max(...positions);
    const min = Math.min(...positions);

    let fuelCosts = [];
    for (let position = min; position <= max; position++) {
        let currentCost = 0;
        for (let j = 0; j < positions.length; j++) {
            currentCost += Math.abs(positions[j] - position);
        }
        fuelCosts.push(currentCost);
    }

    return Math.min(...fuelCosts);
}

export function partTwo(input: string): number | null {
    return null;
}

import { solve, readInput } from "@advent-of-code";

function main() {
    const input = readInput(7);
    solve(partOne, input);
    solve(partTwo, input);
}

if (process.env.NODE_ENV !== "test") {
    main();
}
