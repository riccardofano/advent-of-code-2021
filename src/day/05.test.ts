import { test, expect } from "bun:test";
import { readExample } from "@advent-of-code";
import { partOne, partTwo } from "./05";

test("Day 05 - Part one", () => {
    const input = readExample(5);
    expect(partOne(input)).toEqual(5);
});

test("Day 05 - Part two", () => {
    const input = readExample(5);
    expect(partTwo(input)).toEqual(12);
});
