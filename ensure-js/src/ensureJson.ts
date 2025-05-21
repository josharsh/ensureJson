import { z } from "zod";

/**
 * Error thrown when JSON repair fails.
 */
export class JsonFixError extends Error {
  raw: string;
  constructor(msg: string, raw: string) {
    super(msg);
    this.name = "JsonFixError";
    this.raw = raw;
  }
}

/**
 * Attempts to repair and parse "almost-JSON" text from LLMs.
 * Optionally validates with a Zod schema.
 */
export function ensureJson<T = unknown>(
  raw: string,
  schema?: z.ZodType<T>
): T {
  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = tryRepair(raw);
  }
  if (schema) {
    const result = schema.safeParse(parsed);
    if (!result.success) {
      throw new JsonFixError("Schema validation failed", raw);
    }
    return result.data;
  }
  return parsed;
}

/**
 * Async version of ensureJson.
 */
export async function ensureJsonAsync<T = unknown>(
  raw: string,
  schema?: z.ZodType<T>
): Promise<T> {
  return ensureJson(raw, schema);
}

/**
 * Core repair pipeline for "almost-JSON" text.
 * Follows the steps outlined in the engineering guide.
 */
function tryRepair(raw: string): any {
  let text = raw;

  // 1. Trim markdown fences and chatter
  text = text.replace(/^\s*```(?:json)?|```\s*$/gim, "");
  const firstBrace = Math.min(
    ...["{", "["].map((c) => {
      const i = text.indexOf(c);
      return i === -1 ? Infinity : i;
    })
  );
  if (firstBrace !== Infinity) text = text.slice(firstBrace);

  // 2. Remove trailing commas
  text = text.replace(/,\s*([}\]])/g, "$1");

  // 3. Single ➜ double quotes for keys
  text = text.replace(/'([^']+)':/g, (_, k) => `"${k}":`);

  // 4. Quote bare keys
  text = text.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

  // 5. Balance braces/brackets
  const openBraces = (text.match(/{/g) || []).length;
  const closeBraces = (text.match(/}/g) || []).length;
  if (openBraces === closeBraces + 1) text += "}";
  const openBrackets = (text.match(/\[/g) || []).length;
  const closeBrackets = (text.match(/]/g) || []).length;
  if (openBrackets === closeBrackets + 1) text += "]";

  // 6. Try parsing again
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new JsonFixError("Failed to repair and parse JSON", raw);
  }
}
