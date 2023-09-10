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

export function parseDay(arg: string | undefined): number {
    if (!arg) {
        throw new Error("Provide a day to download");
    }

    const day = parseInt(arg);
    if (isNaN(day) || day < 1 || day > 25) {
        throw new Error("Provide a day between 1 and 25 inclusive");
    }

    return day;
}

export function parseYear(arg: string | undefined): number {
    const today = new Date();
    const currentYear = today.getFullYear();
    // If it's december a new Advent of Code has probably started,
    // this is not 100% accurate because of timezones but whatever.
    const latestYear = today.getMonth() == 11 ? currentYear : currentYear - 1;

    if (!arg) {
        return latestYear;
    }

    const year = parseInt(arg);
    if (isNaN(year) || year < 2015 || year > latestYear) {
        throw new Error(`Provide a year between 2015 and ${latestYear}`);
    }

    return year;
}
