export function partOne(input: string): number | null {
    const lines = input.trim().split("\n");
    let gamma = "";
    let epsilon = "";

    const bitsInLine = lines[0].length;
    const majorityOfBits = Math.ceil(lines.length / 2);

    for (let col = 0; col < bitsInLine; col++) {
        let ones = 0;
        for (let row = 0; row < lines.length; row++) {
            if (lines[row][col] === "1") {
                ones++;
            }
        }

        if (ones >= majorityOfBits) {
            gamma += "1";
            epsilon += "0";
        } else {
            gamma += "0";
            epsilon += "1";
        }
    }

    const decimalGamma = parseInt(gamma, 2);
    const decimalEpsilon = parseInt(epsilon, 2);

    return decimalGamma * decimalEpsilon;
}

export function partTwo(input: string): number | null {
    return null;
}

import { solve, readInput } from "@advent-of-code";

function main() {
    const input = readInput(3);
    solve(partOne, input);
    solve(partTwo, input);
}

if (process.env.NODE_ENV !== "test") {
    main();
}
