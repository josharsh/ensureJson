# ensureJson

A cross-language toolkit to repair and parse "almost-JSON" text from LLMs (e.g., GPT, Claude) and return a valid object in JavaScript or Python. This monorepo contains both a TypeScript/JavaScript package (`ensure-js`) and a Python package (`ensure-py`), each with a minimal CLI and API.

---

## Packages

### ensure-js (TypeScript/JavaScript)

- Location: `ensure-js/`
- Repairs and parses "almost-JSON" to valid JS objects
- CLI and programmatic API
- Zero dependencies

#### Quick Start

```bash
cd ensure-js
npm install
node test.js
```

#### CLI

```bash
echo '{ name: "Alice", age: 42, }' | npx ensure-json
```

#### API

```js
import { ensureJson } from 'ensure-js';
const obj = ensureJson('{ name: "Alice", age: 42, }');
```

---

### ensure-py (Python)

- Location: `ensure-py/`
- Repairs and parses "almost-JSON" to valid Python objects
- CLI and programmatic API
- Zero dependencies (Pydantic optional for schema validation)

#### Quick Start

```bash
cd ensure-py
python3 -m venv venv
source venv/bin/activate
pip install -e .
python test.py
```

#### CLI

```bash
echo '{ name: "Alice", age: 42, }' | ensure-json
# or
echo '{ name: "Alice", age: 42, }' | python -m ensure-py.cli
```

#### API

```python
from ensure_json import ensure_json, JsonFixError

try:
    obj = ensure_json('{ name: "Alice", age: 42, }')
except JsonFixError as err:
    print(err)
```

---

## Development

- See each package's README for more details and advanced usage.
- Use a virtual environment for Python development (see above).
- Node.js 18+ recommended for JS/TS development.

## License

MIT
