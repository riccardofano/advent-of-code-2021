import { test, expect } from "bun:test";
import { readExample } from "@advent-of-code";
import { partOne, partTwo } from "./07";

test("Day 07 - Part one", () => {
    const input = readExample(7);
    expect(partOne(input)).toEqual(37);
});

test("Day 07 - Part two", () => {
    const input = readExample(7);
    expect(partTwo(input)).toEqual(168);
});
