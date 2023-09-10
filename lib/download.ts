import { parseDay, parseYear } from "@advent-of-code";
import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

try {
    const day = parseDay(process.argv[2]);
    const year = parseYear(process.argv[3]);
    await fetchInput(day, year);
} catch (e) {
    console.error(e instanceof Error ? e.message : e);
}

async function fetchInput(day: number, year: number): Promise<string> {
    const tokenPath = join(homedir(), ".adventofcode.session");
    const sessionToken = readFileSync(tokenPath, {
        encoding: "utf-8",
    });

    let response = await fetch(
        `https://adventofcode.com/${year}/day/${day}/input`,
        { headers: { Cookie: `session=${sessionToken}` } }
    );

    if (!response.ok) {
        switch (response.status) {
            case 400:
                throw new Error(
                    `Unauthorized to retrieve this input of day ${day}, is your session token valid?`
                );
            default:
                throw new Error(
                    `Could not retrieve the input. Status: ${response.status}`
                );
        }
    }

    return response.text();
}
