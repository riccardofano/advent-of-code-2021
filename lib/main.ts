import { argv } from "bun";
import { spawn } from "child_process";
import path from "path";

try {
    main();
} catch (e) {
    console.error(e instanceof Error ? e.message : e);
}

function main() {
    const stringDay = argv[2];
    if (!stringDay) {
        throw new Error("USAGE: bun solve {day}");
    }

    const day = parseInt(stringDay);
    if (isNaN(day) || day < 1 || day > 25) {
        throw new Error(
            "Please provide a valid day between 1 and 25 inclusive"
        );
    }

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
