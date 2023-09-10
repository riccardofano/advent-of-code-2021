import { readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

try {
    const stringDay = process.argv[2];
    if (!stringDay) {
        throw new Error("Provide a day to download");
    }

    const year = 2022;
    const day = parseInt(stringDay);
    if (isNaN(day)) {
        throw new Error("Day provided was not a valid number");
    } else if (day < 1 || day > 25) {
        throw new Error("Day provided was not between 1 and 25 inclusive");
    }

    await fetchInput(day, year);
} catch (e) {
    if (e instanceof Error) {
        console.error(`${e.message}`);
    } else {
        console.error(`Unknown error ${e}`);
    }
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
