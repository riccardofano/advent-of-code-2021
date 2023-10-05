export function partOne(input: string): number | null {
    const positions = input.trim().split(",").map(Number);
    positions.sort((a, b) => a - b);
    const median = positions[Math.floor(positions.length / 2)];

    let cost = 0;
    for (let j = 0; j < positions.length; j++) {
        cost += Math.abs(positions[j] - median);
    }

    return cost;
}

export function partTwo(input: string): number | null {
    const positions = input.trim().split(",").map(Number);
    let sum = 0;
    for (let i = 0; i < positions.length; i++) {
        sum += positions[i];
    }
    const mean = Math.floor(sum / positions.length);

    return Math.min(
        calculatePartTwoCost(mean, positions),
        calculatePartTwoCost(mean + 1, positions)
    );
}

function calculatePartTwoCost(
    position: number,
    positions: Array<number>
): number {
    let cost = 0;
    for (let j = 0; j < positions.length; j++) {
        const positionChange = Math.abs(positions[j] - position);
        const additionalCost = (positionChange + 1) / 2;
        cost += positionChange * additionalCost;
    }
    return cost;
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
