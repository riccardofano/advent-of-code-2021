// Every time a number is drawn I look into every board
// if the that board has that number I check its row and col to see if all 5 are in the picked numbers set
// if they are I count do get the intersection between the pickedNumbers set and the board and sum them up

type Point = [number, number];
type Grid = Array<Array<number>>;
type Board = {
    map: Map<number, Point>;
    grid: Grid;
};

function parseBoard(board: string): Board {
    const boardLines = board.split("\n");
    const map = new Map();
    const grid: Grid = [];

    for (let row = 0; row < 5; row++) {
        let line = [];
        for (let col = 0; col < 5; col++) {
            // NOTE: numbers are always 2 characters wide
            const wideCol = col * 3;
            const number = parseInt(
                boardLines[row].slice(wideCol, wideCol + 2)
            );
            map.set(number, [row, col]);
            line.push(number);
        }
        grid.push(line);
    }
    return { map, grid };
}

function hasWinningCombination(
    point: Point,
    grid: Grid,
    pickedNumbers: Set<number>
): boolean {
    let validCol = true;
    let validRow = true;

    const row = point[0];
    const col = point[1];

    for (let i = 0; i < 5; i++) {
        if (!pickedNumbers.has(grid[row][i])) {
            validRow = false;
        }
        if (!pickedNumbers.has(grid[i][col])) {
            validCol = false;
        }
    }

    return validRow || validCol;
}

export function partOne(input: string): number | null {
    let lines = input.split("\n\n");

    const numbers = lines.shift()!.split(",");
    let pickedNumbers = new Set<number>();

    const boards = lines.map(parseBoard);

    while (numbers.length > 0) {
        const newNumber = +(numbers.shift() as string);
        pickedNumbers.add(newNumber);

        for (const board of boards) {
            const coords = board.map.get(newNumber);
            if (
                coords === undefined ||
                !hasWinningCombination(coords, board.grid, pickedNumbers)
            ) {
                continue;
            }

            let sumOfNotPicked = 0;
            for (const key of board.map.keys()) {
                if (!pickedNumbers.has(key)) {
                    sumOfNotPicked += key;
                }
            }

            return sumOfNotPicked * newNumber;
        }
    }

    return null;
}

export function partTwo(input: string): number | null {
    return null;
}

import { solve, readInput } from "@advent-of-code";

function main() {
    const input = readInput(4);
    solve(partOne, input);
    solve(partTwo, input);
}

if (process.env.NODE_ENV !== "test") {
    main();
}
