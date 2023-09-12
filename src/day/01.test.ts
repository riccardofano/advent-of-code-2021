import { test, expect } from "bun:test";
import { readExample } from "@advent-of-code";
import { partOne, partTwo } from "./01";

test("Day 01 - Part one", () => {
    const input = readExample(1);
    expect(partOne(input)).toEqual(7);
});

test("Day 01 - Part two", () => {
    const input = readExample(1);
    expect(partTwo(input)).toEqual(5);
});
