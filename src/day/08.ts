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

function digitIncludes(digit: string, toCheck: string): boolean {
    const letters = digit.split("");
    for (const letter of toCheck) {
        if (!letters.includes(letter)) {
            return false;
        }
    }
    return true;
}

function countIntersections(digit: string, toCheck: string): number {
    const letters = digit.split("");
    let count = 0;
    for (const letter of toCheck) {
        if (letters.includes(letter)) {
            count += 1;
        }
    }
    return count;
}

function decodeDisplay(digits: Array<string>): Map<string, number> {
    const knownDigits: Array<string> = Array(10).fill(undefined);
    const fiveLength = [];
    const sixLength = [];

    for (const digit of digits) {
        switch (digit.length) {
            case 2:
                knownDigits[1] = digit;
                break;
            case 3:
                knownDigits[7] = digit;
                break;
            case 4:
                knownDigits[4] = digit;
                break;
            case 5:
                fiveLength.push(digit);
                break;
            case 6:
                sixLength.push(digit);
                break;
            case 7:
                knownDigits[8] = digit;
                break;
        }
    }

    for (const digit of sixLength) {
        if (digitIncludes(digit, knownDigits[4])) {
            knownDigits[9] = digit;
        } else {
            if (digitIncludes(digit, knownDigits[7])) {
                knownDigits[0] = digit;
            } else {
                knownDigits[6] = digit;
            }
        }
    }

    for (const digit of fiveLength) {
        if (digitIncludes(digit, knownDigits[1])) {
            knownDigits[3] = digit;
        } else {
            if (countIntersections(digit, knownDigits[4]) === 3) {
                knownDigits[5] = digit;
            } else {
                knownDigits[2] = digit;
            }
        }
    }

    const map = new Map<string, number>();
    for (let i = 0; i < knownDigits.length; i++) {
        const sorted = knownDigits[i].split("");
        sorted.sort();

        map.set(sorted.join(""), i);
    }

    return map;
}

export function partTwo(input: string): number | null {
    const lines = input.trim().split("\n");
    let sum = 0;

    for (const line of lines) {
        const [display, output] = line.split(" | ");
        const knownDigits = decodeDisplay(display.split(" "));

        let outputDisplay = "";
        for (const digit of output.split(" ")) {
            const letters = digit.split("");
            letters.sort();
            outputDisplay += knownDigits.get(letters.join(""));
        }

        sum += +outputDisplay;
    }

    return sum;
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
