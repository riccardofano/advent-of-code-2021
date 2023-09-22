type Range = [number, number];
type Line = [Range, Range];
type Point = [number, number];

function pointToString(point: Point): string {
    return `${point[0]},${point[1]}`;
}

function parseLine(line: string): Line {
    const [range1, range2] = line.split(" -> ");
    const [x1, y1] = range1.split(",").map(Number);
    const [x2, y2] = range2.split(",").map(Number);

    const xRange: Range = x1 < x2 ? [x1, x2] : [x2, x1];
    const yRange: Range = y1 < y2 ? [y1, y2] : [y2, y1];

    return [xRange, yRange];
}

function addPoints([x, y]: Line, map: Map<string, number>) {
    const isVertical = x[0] === x[1];
    const isHorizontal = y[0] === y[1];

    if (isHorizontal) {
        for (let i = x[0]; i <= x[1]; i++) {
            const point = pointToString([i, y[0]]);
            map.set(point, (map.get(point) || 0) + 1);
        }
    } else if (isVertical) {
        for (let i = y[0]; i <= y[1]; i++) {
            const point = pointToString([x[0], i]);
            map.set(point, (map.get(point) || 0) + 1);
        }
    }
}

export function partOne(input: string): number | null {
    const map = new Map<string, number>();

    for (const row of input.trim().split("\n")) {
        const line = parseLine(row);
        addPoints(line, map);
    }

    let highDangerPoints = 0;
    for (const intersection of map.values()) {
        if (intersection > 1) {
            highDangerPoints++;
        }
    }

    return highDangerPoints;
}

export function partTwo(input: string): number | null {
    return null;
}

import { solve, readInput } from "@advent-of-code";

function main() {
    const input = readInput(5);
    solve(partOne, input);
    solve(partTwo, input);
}

if (process.env.NODE_ENV !== "test") {
    main();
}
