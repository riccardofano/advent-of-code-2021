import { test, expect } from "bun:test";
import { readExample } from "@advent-of-code";
import { partOne, partTwo } from "./06";

test("Day 06 - Part one", () => {
    const input = readExample(6);
    expect(partOne(input)).toEqual(5934);
});

test("Day 06 - Part two", () => {
    const input = readExample(6);
    expect(partTwo(input)).toEqual(null);
});
