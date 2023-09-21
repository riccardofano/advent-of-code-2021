import { test, expect } from "bun:test";
import { readExample } from "@advent-of-code";
import { partOne, partTwo } from "./04";

test("Day 04 - Part one", () => {
    const input = readExample(4);
    expect(partOne(input)).toEqual(4512);
});

test("Day 04 - Part two", () => {
    const input = readExample(4);
    expect(partTwo(input)).toEqual(null);
});
