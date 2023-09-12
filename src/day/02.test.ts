import { test, expect } from "bun:test";
import { readExample } from "@advent-of-code";
import { partOne, partTwo } from "./02";

test("Day 02 - Part one", () => {
    const input = readExample(2);
    expect(partOne(input)).toEqual(150);
});

test("Day 02 - Part two", () => {
    const input = readExample(2);
    expect(partTwo(input)).toEqual(900);
});
