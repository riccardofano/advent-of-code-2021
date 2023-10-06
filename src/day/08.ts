export function partOne(input: string): number | null {
    const lines = input.trim().split("\n");

    let easyNumbers = 0;
    for (const line of lines) {
        const [digits, output] = line.split(" | ");

        for (const value of output.split(" ")) {
            if ([2, 3, 4, 7].includes(value.length)) {
                easyNumbers += 1;
            }
        }
    }

    return easyNumbers;
}

export function partTwo(input: string): number | null {
    return null;
}

import { solve, readInput } from "@advent-of-code";

function main() {
    const input = readInput(8);
    solve(partOne, input);
    solve(partTwo, input);
}

if (process.env.NODE_ENV !== "test") {
    main();
}
