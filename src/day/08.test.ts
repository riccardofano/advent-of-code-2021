import { test, expect } from "bun:test";
import { readExample } from "@advent-of-code";
import { partOne, partTwo } from "./08";

test("Day 08 - Part one", () => {
    const input = readExample(8);
    expect(partOne(input)).toEqual(26);
});

test("Day 08 - Part two", () => {
    const input = readExample(8);
    expect(partTwo(input)).toEqual(61229);
});
