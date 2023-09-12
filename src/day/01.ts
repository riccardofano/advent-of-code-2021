export function partOne(input: string): number | null {
    const lines = input.trim().split("\n");
    let increases = 0;

    for (let i = 1; i < lines.length; i++) {
        if (+lines[i] > +lines[i - 1]) {
            increases++;
        }
    }

    return increases;
}

export function partTwo(input: string): number | null {
    const lines = input
        .trim()
        .split("\n")
        .map((l) => parseInt(l));
    let increases = 0;
    let previousSum = Infinity;

    for (let i = 2; i < lines.length; i++) {
        let currentSum = lines[i] + lines[i - 1] + lines[i - 2];
        if (currentSum > previousSum) {
            increases++;
        }
        previousSum = currentSum;
    }

    return increases;
}

import { solve, readInput } from "@advent-of-code";

function main() {
    const input = readInput(1);
    solve(partOne, input);
    solve(partTwo, input);
}

if (process.env.NODE_ENV !== "test") {
    main();
}
