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
    const lines = input.trim().split("\n");
    let increases = 0;

    for (let i = 3; i < lines.length; i++) {
        if (+lines[i] > +lines[i - 3]) {
            increases++;
        }
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
