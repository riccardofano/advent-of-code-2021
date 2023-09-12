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

function findOxygenRating(lines: Array<string>): string {
    let i = 0;
    let validLines = lines;

    while (validLines.length > 1) {
        let ones = 0;

        for (const line of validLines) {
            if (line[i] === "1") {
                ones++;
            }
        }

        const zeroes = validLines.length - ones;
        const mostCommon = ones >= zeroes ? "1" : "0";

        validLines = validLines.filter((line) => line[i] === mostCommon);
        i++;
    }

    return validLines[0];
}

function findScrubberRating(lines: Array<string>): string {
    let i = 0;
    let validLines = lines;

    while (validLines.length > 1) {
        let ones = 0;

        for (const line of validLines) {
            if (line[i] === "1") {
                ones++;
            }
        }

        const zeroes = validLines.length - ones;
        const leastCommon = ones < zeroes ? "1" : "0";

        validLines = validLines.filter((line) => line[i] === leastCommon);
        i++;
    }

    return validLines[0];
}

export function partTwo(input: string): number | null {
    const lines = input.trim().split("\n");
    const oxygenRating = findOxygenRating(lines);
    const scrubberRating = findScrubberRating(lines);

    return parseInt(oxygenRating, 2) * parseInt(scrubberRating, 2);
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
