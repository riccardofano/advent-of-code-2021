function simulateDay(timings: Array<number>): Array<number> {
    const nextTimings = Array(9).fill(0);

    for (let i = 0; i < timings.length; i++) {
        const amountOfFish = timings[i];
        switch (i) {
            case 0:
                nextTimings[8] += amountOfFish;
                nextTimings[6] += amountOfFish;
                break;
            default:
                nextTimings[i - 1] += amountOfFish;
        }
    }

    return nextTimings;
}

function countFish(timings: Array<number>): number {
    let sum = 0;
    for (const fish of timings) {
        sum += fish;
    }

    return sum;
}

export function partOne(input: string): number | null {
    // The index is the days let until it hatches, the value is the amount of fish
    let timings = Array(9).fill(0);
    const initialFish = input.trim().split(",");
    for (const timeUntilHatch of initialFish) {
        timings[+timeUntilHatch] += 1;
    }

    for (let day = 0; day < 80; day++) {
        timings = simulateDay(timings);
    }

    return countFish(timings);
}

export function partTwo(input: string): number | null {
    let timings = Array(9).fill(0);
    const initialFish = input.trim().split(",");
    for (const timeUntilHatch of initialFish) {
        timings[+timeUntilHatch] += 1;
    }

    for (let day = 0; day < 256; day++) {
        timings = simulateDay(timings);
    }

    return countFish(timings);
}

import { solve, readInput } from "@advent-of-code";

function main() {
    const input = readInput(6);
    solve(partOne, input);
    solve(partTwo, input);
}

if (process.env.NODE_ENV !== "test") {
    main();
}
