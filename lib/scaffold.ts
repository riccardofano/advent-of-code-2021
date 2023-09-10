import fs from "fs";
import path from "path";

import { parseDay } from "@advent-of-code";

try {
    const day = parseDay(process.argv[2]);
    scaffold(day);
} catch (e) {
    console.error(e instanceof Error ? e.message : e);
}

export function scaffold(day: number) {
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
    writeFile(exampleFilePath, "", "Failed to create empty example file");

    const inputDirectory = path.join(import.meta.dir, "..", "src", "input");
    mkDir(inputDirectory, "Failed to create input directory");

    const inputFilePath = path.join(inputDirectory, `${paddedDay}.txt`);
    writeFile(inputFilePath, "", "Failed to create empty input file");
}

function mkDir(path: string, errorMessage: string) {
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err && err?.code !== "EEXIST") {
            throw new Error(errorMessage);
        }
    });
}

function writeFile(filePath: string, data: string, errorMessage: string) {
    fs.writeFile(filePath, data, (err) => {
        if (err && err.code !== "EEXIST") {
            throw new Error(errorMessage);
        }
        const dirname = path.basename(path.dirname(filePath));
        const filename = path.basename(filePath);
        console.info(`Created ${path.join(dirname, filename)}`);
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
    solve(partOne, input);
    solve(partTwo, input);
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

test("Part two", () => {
    const input = readExample(${day});
    expect(partTwo(input)).toEqual(null);
});
`;
}
