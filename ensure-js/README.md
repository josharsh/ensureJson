# ensureJSON
Turn "almost-JSON" into real json. Don't worry about JSON handling. Get ensured JSON or an exception.

## TL;DR

* **Mission:** Deliver a <3 kB, dependency‑free helper that repairs "almost‑JSON" text from LLMs and returns a valid JavaScript object—or throws `JsonFixError` so callers can re‑prompt.
* **Scope:** Sync + async API, optional Zod schema validation, minimal CLI, zero coupling to any AI vendor.
* **Outcome:** Published on npm as `@ai/json-fix`, ESM‑first with CJS fallback.

## Why?

1. **Broken JSON is everywhere.** LLMs often miss quotes, add trailing commas, or wrap payloads in markdown fences.
2. **Developers hand‑roll hacks.** Teams burn time writing brittle regexes or re‑prompting, incurring latency and cost.
3. **A tiny, polished utility** removes that friction and quietly powers chatbots, pipelines, and edge functions—just like `chalk` powers terminal color.

## Install

```bash
pnpm add ensureJSON
# or
npm install ensureJSON
```

## Usage

### Programmatic

```js
import { ensureJson, JsonFixError } from "ensureJSON";

try {
  const obj = ensureJson(`{ name: "Alice", age: 42, }`);
  // obj: { name: "Alice", age: 42 }
} catch (err) {
  if (err instanceof JsonFixError) {
    // handle error, maybe re-prompt LLM
  }
}
```

### With Zod Schema

```js
import { ensureJson } from "ensureJSON";
import { z } from "zod";

const schema = z.object({ name: z.string(), age: z.number() });
const obj = ensureJson(`{ name: "Alice", age: 42 }`, schema);
// obj: { name: "Alice", age: 42 }
```

### Async

```js
import { ensureJsonAsync } from "ensureJSON";
const obj = await ensureJsonAsync(`{ name: "Alice" }`);
```

### CLI

```bash
echo '{ name: "Alice", age: 42, }' | json-fix
# { "name": "Alice", "age": 42 }
```

Show help:

```bash
json-fix --help
```

## API

- `ensureJson<T>(raw: string, schema?: ZodType<T>): T`
- `ensureJsonAsync<T>(raw: string, schema?: ZodType<T>): Promise<T>`
- `JsonFixError` (includes `.raw` property)

## Features

- Repairs and parses "almost-JSON" from LLMs (GPT, Claude, etc.)
- Works in Node, Bun, Deno, Cloudflare Workers, browsers
- Sync & async API
- Optional Zod schema validation
- Minimal CLI
- Zero dependencies, pure TypeScript

## License

MIT
