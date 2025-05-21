# ensureJson

[![PyPI version](https://img.shields.io/pypi/v/ensure-py.svg?label=ensure-py)](https://pypi.org/project/ensure-py/)
[![npm version](https://img.shields.io/npm/v/ensure-json.svg?label=ensure-json)](https://www.npmjs.com/package/ensure-json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Repair and parse "almost-JSON" from LLMs (like GPT, Claude) into valid objects in both Python and JavaScript.**

---

## Why?

LLMs often output JSON-like text that isn't quite valid JSON (extra commas, unquoted keys, markdown fences, etc.). `ensureJson` is a toolkit for both Python and JavaScript/TypeScript that repairs and parses these "almost-JSON" blobs, so you can work with real objects in your code.

---

## Features

- Repairs and parses "almost-JSON" from LLMs (extra commas, unquoted keys, markdown, etc.)
- Works in both Python (3.7+) and JavaScript/TypeScript (Node.js 18+)
- Minimal CLI for quick fixes
- Optional schema validation (Pydantic for Python, Zod for JS)
- Zero dependencies required for core functionality
- MIT licensed, open source

---

## Quick Install

### Python

[ensure-py on PyPI](https://pypi.org/project/ensure-py/)

```bash
pip install ensure-py
```

### JavaScript / TypeScript

[ensure-json on npm](https://www.npmjs.com/package/ensure-json)

```bash
npm install ensure-json
# or
pnpm add ensure-json
```

---

## Usage

### Python

#### Library

```python
from ensure_json import ensure_json, JsonFixError

try:
    obj = ensure_json('{ name: "Alice", age: 42, }')
    print(obj)  # {'name': 'Alice', 'age': 42}
except JsonFixError as err:
    print("Could not parse JSON:", err)
```

#### CLI

```bash
echo '{ name: "Alice", age: 42, }' | ensure-json
```

See more: [ensure-py on PyPI](https://pypi.org/project/ensure-py/)

---

### JavaScript / TypeScript

#### Library

```js
import { ensureJson } from 'ensure-json';

const obj = ensureJson('{ name: "Alice", age: 42, }');
console.log(obj); // { name: "Alice", age: 42 }
```

#### CLI

```bash
echo '{ name: "Alice", age: 42, }' | npx ensure-json
```

See more: [ensure-json on npm](https://www.npmjs.com/package/ensure-json)

---

## Monorepo Structure

```
ensureJson/
├── ensure-js/      # JavaScript/TypeScript package
├── ensure-py/      # Python package
├── README.md       # (this file)
└── ...             # configs, scripts, etc.
```

---

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, features, or improvements.

- Use a virtual environment for Python development.
- Use Node.js 18+ for JS/TS development.
- Follow the code style and patterns in each package.

---

## License

MIT
