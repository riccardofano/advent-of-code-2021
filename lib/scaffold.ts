import fs from "fs";
import path from "path";

try {
    const stringDay = process.argv[2];
    if (!stringDay) {
        throw new Error("Provide a day to download");
    }

    const day = parseInt(stringDay);
    if (isNaN(day)) {
        throw new Error("Day provided was not a valid number");
    } else if (day < 1 || day > 25) {
        throw new Error("Day provided was not between 1 and 25 inclusive");
    }

    scaffold(day);
} catch (e) {
    if (e instanceof Error) {
        console.error(`${e.message}`);
    } else {
        console.error(`Unknown error ${e}`);
    }
}

function scaffold(day: number) {
    const paddedDay = day.toString().padStart(2, "0");

    const dayDirectory = path.join(import.meta.dir, "..", "src", "day");
    fs.mkdir(dayDirectory, { recursive: true }, (err) => {
        if (err && err?.code !== "EEXIST") {
            throw new Error("Failed to create day directory");
        }
    });

    const dayTemplate = createDayTemplate(day);
    const testTemplate = createTestTemplate(day, paddedDay);

    const dayPath = path.join(dayDirectory, `${paddedDay}.ts`);
    const testPath = path.join(dayDirectory, `${paddedDay}.test.ts`);
    fs.writeFile(dayPath, dayTemplate, (err) => {
        if (err && err.code !== "EEXIST") {
            throw new Error(`Failed to create ${paddedDay}.ts`);
        }
    });
    fs.writeFile(testPath, testTemplate, (err) => {
        if (err && err.code !== "EEXIST") {
            throw new Error(`Failed to create ${paddedDay}.ts`);
        }
    });
}

function createDayTemplate(day: number) {
    return `\
export function partOne(input: string): number | null {
    return null;
}

export function partTwo(input: string): number | null {
    return null;
}

import { solve, readInput } from "@advent-of-code";

function main() {
    const input = readInput(${day});
    solve(partOne(input));
    solve(partTwo(input));
}

main();
`;
}

function createTestTemplate(day: number, dayPath: string): string {
    return `\
import { test, expect } from "bun:test";
import { readExample } from "@advent-of-code";
import { partOne, partTwo } from "./${dayPath}.js";

test("Part one", () => {
    const input = readExample(${day});
    expect(partOne(input)).toEqual(null);
});

test("Part one", () => {
    const input = readExample(${day});
    expect(partOne(input)).toEqual(null);
});
`;
}
