#!/usr/bin/env node
import { ensureJson, JsonFixError } from "./ensureJson.js";

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk: string) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

async function main() {
  if (process.argv.includes("--help")) {
    console.log(`Usage: json-fix [--help]
Reads JSON from stdin, repairs it, and writes valid JSON to stdout.
Exits 0 on success, 1 on failure.`);
    process.exit(0);
  }

  try {
    const input = await readStdin();
    const result = ensureJson(input);
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    process.exit(0);
  } catch (err) {
    if (err instanceof JsonFixError) {
      process.stderr.write(`JsonFixError: ${err.message}\n`);
    } else {
      process.stderr.write(`Error: ${String(err)}\n`);
    }
    process.exit(1);
  }
}

main();
