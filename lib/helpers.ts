import { AnyFunction } from "bun";
import fs from "fs";
import path from "path";

const BASE_PATH = path.join(import.meta.dir, "..", "src");
const INPUT_PATH = path.join(BASE_PATH, "input");
const EXAMPLE_PATH = path.join(BASE_PATH, "example");

export function solve(fn: AnyFunction, ...args: Array<any>) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();

    if (result === null) {
        console.log("Not solved.");
    } else {
        console.log(`${result} (elapsed ${end - start})`);
    }
}

function readFile(day: number, basePath: string): string {
    const paddedDay = day.toString().padStart(2, "0");
    const filename = `${paddedDay}.txt`;
    const filePath = path.join(basePath, filename);
    try {
        const contents = fs.readFileSync(filePath);
        if (contents.length === 0) {
            const shortPath = path.join(path.basename(basePath), filename);
            console.warn(
                `'${shortPath}' is empty, did you forget to populate it?`
            );
        }
        return contents.toString();
    } catch (e) {
        console.error(`${filePath} -`, e instanceof Error ? e.message : e);
    }

    return "";
}

export function readInput(day: number): string {
    return readFile(day, INPUT_PATH);
}

export function readExample(day: number): string {
    return readFile(day, EXAMPLE_PATH);
}
