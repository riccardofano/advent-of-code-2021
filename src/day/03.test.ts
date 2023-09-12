import { test, expect } from "bun:test";
import { readExample } from "@advent-of-code";
import { partOne, partTwo } from "./03";

test("Day 03 - Part one", () => {
    const input = readExample(3);
    expect(partOne(input)).toEqual(198);
});

test("Day 03 - Part two", () => {
    const input = readExample(3);
    expect(partTwo(input)).toEqual(230);
});
