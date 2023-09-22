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

    return [
        [x1, x2],
        [y1, y2],
    ];
}

function addPoints(
    [x, y]: Line,
    map: Map<string, number>,
    calcDiagonal: boolean
) {
    const normX: Range = x[0] < x[1] ? [x[0], x[1]] : [x[1], x[0]];
    const normY: Range = y[0] < y[1] ? [y[0], y[1]] : [y[1], y[0]];
    const isVertical = x[0] === x[1];
    const isHorizontal = y[0] === y[1];

    if (isHorizontal) {
        for (let i = normX[0]; i <= normX[1]; i++) {
            const point = pointToString([i, y[0]]);
            map.set(point, (map.get(point) || 0) + 1);
        }
    } else if (isVertical) {
        for (let i = normY[0]; i <= normY[1]; i++) {
            const point = pointToString([x[0], i]);
            map.set(point, (map.get(point) || 0) + 1);
        }
    } else if (calcDiagonal) {
        const range = Math.abs(x[1] - x[0]);
        const xDelta = x[0] < x[1] ? 1 : -1;
        const yDelta = y[0] < y[1] ? 1 : -1;

        for (let i = 0; i <= range; i++) {
            const newX = x[0] + i * xDelta;
            const newY = y[0] + i * yDelta;

            const point = pointToString([newX, newY]);
            map.set(point, (map.get(point) || 0) + 1);
        }
    }
}

export function partOne(input: string): number | null {
    const map = new Map<string, number>();

    for (const row of input.trim().split("\n")) {
        const line = parseLine(row);
        addPoints(line, map, false);
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
    const map = new Map<string, number>();

    for (const row of input.trim().split("\n")) {
        const line = parseLine(row);
        addPoints(line, map, true);
    }

    let highDangerPoints = 0;
    for (const intersection of map.values()) {
        if (intersection > 1) {
            highDangerPoints++;
        }
    }

    return highDangerPoints;
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
