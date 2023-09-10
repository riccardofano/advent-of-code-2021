import { argv } from "bun";
import { spawn } from "child_process";
import path from "path";

import { parseDay, parseYear } from "@advent-of-code";
import { fetchInput } from "./download";
import { populateInput, scaffold } from "./scaffold";

try {
    main();
} catch (e) {
    console.error(e instanceof Error ? e.message : e);
}

function main() {
    const command = argv[2];
    if (!command) {
        throw new Error("USAGE: bun <command> day [year]");
    }

    const day = parseDay(argv[3]);
    const year = parseYear(argv[4]);

    switch (command) {
        case "solve":
            solve(day);
            break;
        case "download":
            fetchInput(day, year).then((text) => {
                populateInput(text, day);
            });
            break;
        case "scaffold":
            scaffold(day);
            break;
        case "generate":
            scaffold(day, false);
            fetchInput(day, year).then((text) => {
                populateInput(text, day);
            });
            break;
        default:
            throw new Error(
                "Unknown command. Available commands are 'solve', 'download', 'scaffold' and 'generate'"
            );
    }
}

function solve(day: number) {
    const paddedDay = day.toString().padStart(2, "0");
    const dayPath = path.join(
        import.meta.dir,
        "..",
        "src",
        "day",
        `${paddedDay}.ts`
    );

    const child = spawn("bun", [dayPath]);
    child.stdout.setEncoding("utf-8");
    child.stdout.on("data", console.log);

    child.stderr.setEncoding("utf-8");
    child.stderr.on("data", console.error);
}
