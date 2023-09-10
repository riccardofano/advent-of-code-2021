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
    mkDir(dayDirectory, "Failed to create day directory");

    const dayTemplate = createDayTemplate(day);
    const testTemplate = createTestTemplate(day, paddedDay);

    const dayPath = path.join(dayDirectory, `${paddedDay}.ts`);
    const testPath = path.join(dayDirectory, `${paddedDay}.test.ts`);
    writeFile(dayPath, dayTemplate, `Failed to create ${paddedDay}.ts`);
    writeFile(testPath, testTemplate, `Failed to create ${paddedDay}.test.ts`);

    const exampleDirectory = path.join(import.meta.dir, "..", "src", "example");
    mkDir(exampleDirectory, "Failed to create example directory");
    const exampleFilePath = path.join(exampleDirectory, `${paddedDay}.txt`);
    writeFile(exampleFilePath, "", "Failed to create example file");
}

function mkDir(path: string, errorMessage: string) {
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err && err?.code !== "EEXIST") {
            throw new Error(errorMessage);
        }
    });
}

function writeFile(path: string, data: string, errorMessage: string) {
    fs.writeFile(path, data, (err) => {
        if (err && err.code !== "EEXIST") {
            throw new Error(errorMessage);
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
import { partOne, partTwo } from "./${dayPath}";

test("Part one", () => {
    const input = readExample(${day});
    expect(partOne(input)).toEqual(null);
});

test("Part one", () => {
    const input = readExample(${day});
    expect(partTwo(input)).toEqual(null);
});
`;
}
