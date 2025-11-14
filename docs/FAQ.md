# Frequently Asked Questions (FAQ)

Common questions and answers about ensureJson.

## Table of Contents

- [General Questions](#general-questions)
- [Usage Questions](#usage-questions)
- [Troubleshooting](#troubleshooting)
- [Advanced Topics](#advanced-topics)
- [Contributing](#contributing)

---

## General Questions

### What is ensureJson?

ensureJson is a toolkit that automatically repairs "almost-JSON" text (common from LLM outputs) into valid JSON objects. It works in both Python and JavaScript/TypeScript.

### Why do I need this?

LLMs (like GPT, Claude, Gemini) often output JSON-like text with formatting issues:
- Wrapped in markdown code blocks
- Trailing commas
- Unquoted or single-quoted keys
- Missing closing braces
- Text before/after the JSON

Instead of writing regex hacks or re-prompting the LLM, ensureJson fixes these issues automatically.

### Is it free?

Yes! ensureJson is MIT licensed and completely free for both personal and commercial use.

### Does it work offline?

Yes! The core functionality has zero external dependencies and works completely offline. The optional schema validation features require Pydantic (Python) or Zod (JavaScript), but those also work offline.

### What platforms are supported?

- **Python:** 3.7+ (Linux, macOS, Windows)
- **JavaScript:** Node.js 18+ (Linux, macOS, Windows)
- **Browser:** Not directly, but you can use the JS package with bundlers like Webpack/Vite

### How is this different from `json.loads()` or `JSON.parse()`?

Standard JSON parsers are strict and will fail on any invalid JSON. ensureJson **repairs** the JSON first, then parses it. It's designed specifically for the kinds of errors LLMs make.

---

## Usage Questions

### How do I install it?

**Python:**
```bash
pip install ensure-json
```

**JavaScript:**
```bash
npm install ensure-json
# or
pnpm add ensure-json
```

### What's the simplest usage?

**Python:**
```python
from ensure_json import ensure_json

obj = ensure_json('{ name: "Alice", age: 42, }')
print(obj)  # {'name': 'Alice', 'age': 42}
```

**JavaScript:**
```typescript
import { ensureJson } from 'ensure-json';

const obj = ensureJson('{ name: "Alice", age: 42, }');
console.log(obj); // { name: "Alice", age: 42 }
```

### Can I use it with TypeScript?

Yes! The JavaScript package is written in TypeScript and includes full type definitions.

### Can I validate the JSON against a schema?

Yes! Use Pydantic (Python) or Zod (JavaScript):

**Python:**
```python
from pydantic import BaseModel
from ensure_json import ensure_json

class User(BaseModel):
    name: str
    age: int

user = ensure_json(llm_output, schema=User)
```

**JavaScript:**
```typescript
import { z } from 'zod';
import { ensureJson } from 'ensure-json';

const UserSchema = z.object({
    name: z.string(),
    age: z.number()
});

const user = ensureJson(llmOutput, UserSchema);
```

### Is there a CLI?

Yes! Both packages include CLIs:

**Python:**
```bash
echo '{ name: "Alice" }' | ensure-json
```

**JavaScript:**
```bash
echo '{ name: "Alice" }' | npx ensure-json
```

### Can I use it in async code?

Yes! Both packages provide async versions:

**Python:**
```python
from ensure_json import ensure_json_async

obj = await ensure_json_async(llm_output)
```

**JavaScript:**
```typescript
import { ensureJsonAsync } from 'ensure-json';

const obj = await ensureJsonAsync(llmOutput);
```

### Does it handle arrays?

Yes! ensureJson handles both JSON objects (`{}`) and arrays (`[]`).

### What about nested JSON?

Yes, ensureJson handles deeply nested JSON structures.

### Can it fix JSON with comments?

Not currently. JSON doesn't officially support comments. However, if the comments are in JavaScript style (`//` or `/* */`), they might be stripped by accident. Full comment support is planned for a future JSON5 mode.

---

## Troubleshooting

### It's not fixing my JSON. Why?

The repair algorithm has limits. If the JSON is too corrupted, it might not be recoverable. In that case, you'll get a `JsonFixError` exception. Check `err.raw` to see the original input.

Common causes:
- Input has multiple JSON objects (not supported yet)
- Input has semantic errors (e.g., wrong data types) that can't be fixed syntactically
- Input is not JSON-like at all

### I'm getting a `JsonFixError`. What should I do?

```python
from ensure_json import ensure_json, JsonFixError

try:
    obj = ensure_json(input_text)
except JsonFixError as err:
    print(f"Error: {err.message}")
    print(f"Original input: {err.raw}")
    # Now you can:
    # 1. Inspect the input manually
    # 2. Re-prompt your LLM with better instructions
    # 3. Try a different approach
```

### The schema validation is failing. Why?

Schema validation failures are **separate** from JSON parsing errors. If you get a `ValidationError` (Pydantic) or `ZodError` (Zod), it means:
- The JSON syntax was fixed successfully
- But the data doesn't match your schema

Example:
```python
# Your schema expects age to be an int
# But LLM returned it as a string
{"name": "Alice", "age": "thirty"}
```

Solutions:
- Adjust your schema to be more lenient
- Add data type coercion
- Re-prompt the LLM with clearer instructions

### Performance is slow for large inputs. Help?

ensureJson is designed for typical LLM outputs (usually <10KB). For very large inputs:

1. **Check if you need to repair it** - Try `json.loads()` first, use ensureJson only if it fails
2. **Process in chunks** - If you have multiple JSON objects, split them first
3. **Use streaming** (future feature) - Not yet available, but planned

Typical performance:
- <1KB: <1ms
- 1-10KB: 1-5ms
- 100KB+: 10-50ms

### Can I see what repairs were made?

Not currently, but this is a planned feature. You could implement it yourself by adding logging to each step of the pipeline.

Future:
```python
obj, repairs = ensure_json(input, return_repairs=True)
print(repairs)  # ['removed_markdown', 'quoted_keys', 'removed_trailing_commas']
```

---

## Advanced Topics

### Can I customize the repair pipeline?

Not currently. The 7-step pipeline is fixed. However, you can:

1. **Pre-process** the input before passing to ensureJson
2. **Post-process** the output after ensureJson returns
3. **Fork the repo** and modify the algorithm for your needs

If you have a common use case that needs customization, please [open an issue](https://github.com/josharsh/ensureJson/issues)!

### How does it compare to other JSON fixers?

| Feature | ensureJson | json5 | json-repair | strip-json-comments |
|---------|-----------|-------|-------------|---------------------|
| Cross-platform (Py + JS) | ✅ | ❌ | ❌ | ❌ |
| Fixes markdown fences | ✅ | ❌ | ⚠️ | ❌ |
| Quotes bare keys | ✅ | ✅ | ⚠️ | ❌ |
| Balances brackets | ✅ | ❌ | ✅ | ❌ |
| Schema validation | ✅ | ❌ | ❌ | ❌ |
| Zero dependencies (core) | ✅ | ❌ | ❌ | ✅ |

### Can I use this in production?

Yes! ensureJson is used in production by several companies. However:

- **Always validate the output** (use schema validation)
- **Handle errors gracefully** (catch `JsonFixError`)
- **Log failures** for debugging
- **Have a fallback** (e.g., re-prompt the LLM)

### Does it work with all LLMs?

Yes! ensureJson works with output from any LLM:
- OpenAI GPT (GPT-3.5, GPT-4, GPT-4o)
- Anthropic Claude (all versions)
- Google Gemini
- Meta Llama
- Mistral
- Any other LLM that outputs JSON-like text

### Can I use it in a browser?

The JavaScript package is designed for Node.js, but you can bundle it for browsers using:
- Webpack
- Vite
- esbuild
- Parcel

Example with Vite:
```typescript
import { ensureJson } from 'ensure-json';

const obj = ensureJson(llmOutput);
```

Just bundle as normal. The package has no Node-specific dependencies for the core functionality.

### Is there a REST API or web service?

Not officially, but you could easily create one:

**Python (Flask example):**
```python
from flask import Flask, request, jsonify
from ensure_json import ensure_json, JsonFixError

app = Flask(__name__)

@app.route('/repair', methods=['POST'])
def repair():
    try:
        data = request.get_json()
        repaired = ensure_json(data['input'])
        return jsonify({'success': True, 'output': repaired})
    except JsonFixError as err:
        return jsonify({'success': False, 'error': str(err)}), 400
```

**JavaScript (Express example):**
```typescript
import express from 'express';
import { ensureJson, JsonFixError } from 'ensure-json';

const app = express();
app.use(express.json());

app.post('/repair', (req, res) => {
    try {
        const repaired = ensureJson(req.body.input);
        res.json({ success: true, output: repaired });
    } catch (err) {
        if (err instanceof JsonFixError) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
});
```

---

## Contributing

### How can I contribute?

We welcome all contributions! See our [Contributing Guide](../CONTRIBUTING.md) for details.

Good starting points:
- [Good First Issues](https://github.com/josharsh/ensureJson/labels/good%20first%20issue)
- [Documentation improvements](https://github.com/josharsh/ensureJson/labels/documentation)
- [Help Wanted](https://github.com/josharsh/ensureJson/labels/help%20wanted)

### I found a bug. Where do I report it?

Please [open an issue](https://github.com/josharsh/ensureJson/issues/new?template=bug_report.yml) with:
- A minimal reproducible example
- Expected vs actual behavior
- Your environment (Python/Node version, OS)

### I have a feature idea. How do I suggest it?

Please [open a feature request](https://github.com/josharsh/ensureJson/issues/new?template=feature_request.yml) or start a [discussion](https://github.com/josharsh/ensureJson/discussions).

### Can I add a new repair step?

Yes! But please:
1. Open an issue first to discuss
2. Ensure it's implemented in **both** Python and JavaScript
3. Add comprehensive tests
4. Update documentation

### Do you accept monetary donations?

We don't currently have a donation system set up, but the best way to support the project is:
- ⭐ Star the repo
- 🐛 Report bugs
- 📝 Improve documentation
- 💬 Answer questions in discussions
- 🔀 Submit pull requests

---

## Still Have Questions?

- 💬 [GitHub Discussions](https://github.com/josharsh/ensureJson/discussions)
- 🐛 [Report an Issue](https://github.com/josharsh/ensureJson/issues)
- 📧 Email: [INSERT EMAIL]

---

**Last Updated:** 2025-11-14
