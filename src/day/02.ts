type State = {
    depth: number;
    hPosition: number;
    aim: number;
};

function executeLine(line: string, state: State) {
    const [command, stringAmount] = line.split(" ");
    const amount = parseInt(stringAmount);

    switch (command) {
        case "forward":
            state.hPosition += amount;
            break;
        case "up":
            state.depth -= amount;
            break;
        case "down":
            state.depth += amount;
            break;
        default:
            throw new Error(`Unexpected command: ${command}`);
    }
}

function executeLineFromManual(line: string, state: State) {
    const [command, stringAmount] = line.split(" ");
    const amount = parseInt(stringAmount);

    switch (command) {
        case "forward":
            state.hPosition += amount;
            state.depth += state.aim * amount;
            break;
        case "up":
            state.aim -= amount;
            break;
        case "down":
            state.aim += amount;
            break;
        default:
            throw new Error(`Unexpected command: ${command}`);
    }
}

export function partOne(input: string): number | null {
    const state: State = { depth: 0, hPosition: 0, aim: 0 };
    const lines = input.trim().split("\n");

    for (let i = 0; i < lines.length; i++) {
        executeLine(lines[i], state);
    }

    return state.depth * state.hPosition;
}

export function partTwo(input: string): number | null {
    const state: State = { depth: 0, hPosition: 0, aim: 0 };
    const lines = input.trim().split("\n");

    for (let i = 0; i < lines.length; i++) {
        executeLineFromManual(lines[i], state);
    }

    return state.depth * state.hPosition;
}

import { solve, readInput } from "@advent-of-code";

function main() {
    const input = readInput(2);
    solve(partOne, input);
    solve(partTwo, input);
}

if (process.env.NODE_ENV !== "test") {
    main();
}
