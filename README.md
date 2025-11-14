<div align="center">

# 🔧 ensureJson

### **Turn LLM "almost-JSON" into real JSON. Automatically.**

[![PyPI version](https://img.shields.io/pypi/v/ensure-json.svg?label=Python)](https://pypi.org/project/ensure-json/)
[![npm version](https://img.shields.io/npm/v/ensure-json.svg?label=JavaScript)](https://www.npmjs.com/package/ensure-json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)](https://www.python.org/)
[![Node](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Good First Issue](https://img.shields.io/github/issues/josharsh/ensureJson/good%20first%20issue?label=good%20first%20issues)](https://github.com/josharsh/ensureJson/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

[**Quick Start**](#quick-install) • [**Documentation**](#usage) • [**Examples**](#examples) • [**Contributing**](CONTRIBUTING.md) • [**Discord**](#community)

</div>

---

## 🎯 The Problem

```python
# LLM outputs this garbage:
'''
```json
{
  name: "Alice",
  age: 42,
  hobbies: ['reading', "coding",],
}
```
'''

# You need this:
{"name": "Alice", "age": 42, "hobbies": ["reading", "coding"]}
```

**ensureJson fixes it automatically.** No regex hacks. No re-prompting. Just working JSON.

---

## ✨ Why ensureJson?

| Problem | Solution |
|---------|----------|
| LLMs wrap JSON in markdown fences | ✅ Automatically stripped |
| Trailing commas everywhere | ✅ Removed intelligently |
| Unquoted or single-quoted keys | ✅ Fixed to valid JSON |
| Missing closing braces | ✅ Auto-balanced |
| Text before/after JSON | ✅ Extracted cleanly |
| Need schema validation | ✅ Pydantic/Zod support built-in |

**Works in both Python and JavaScript.** Same API. Same behavior.

---

## 🚀 Features

- 🔧 **7-Step Repair Pipeline** - Intelligently fixes common LLM JSON mistakes
- 🌍 **Cross-Platform** - Works in Python (3.7+) and JavaScript/TypeScript (Node.js 18+)
- ⚡ **Zero Dependencies** - Core functionality has no external dependencies
- 🛡️ **Type-Safe** - Full TypeScript support and Python type hints
- ✅ **Schema Validation** - Optional Pydantic (Python) or Zod (JavaScript) validation
- 🎯 **CLI Tools** - Command-line interfaces for quick fixes
- 🔄 **Sync & Async** - Both synchronous and asynchronous APIs
- 📦 **Tiny Size** - Minimal footprint, maximum impact
- 🧪 **Battle-Tested** - Used in production AI applications
- 📝 **MIT Licensed** - Free for personal and commercial use

---

## 📦 Quick Install

<table>
<tr>
<td width="50%">

### Python

```bash
pip install ensure-json
```

[View on PyPI →](https://pypi.org/project/ensure-json/)

</td>
<td width="50%">

### JavaScript / TypeScript

```bash
npm install ensure-json
# or
pnpm add ensure-json
```

[View on npm →](https://www.npmjs.com/package/ensure-json)

</td>
</tr>
</table>

---

## 💡 Usage

<table>
<tr>
<td width="50%">

### 🐍 Python

**Basic Usage:**
```python
from ensure_json import ensure_json

# Fix LLM output
broken = '```json\n{ name: "Alice", age: 42, }\n```'
obj = ensure_json(broken)
print(obj)  # {'name': 'Alice', 'age': 42}
```

**With Error Handling:**
```python
from ensure_json import ensure_json, JsonFixError

try:
    obj = ensure_json(llm_output)
except JsonFixError as err:
    print(f"Failed: {err}")
    print(f"Raw input: {err.raw}")
```

**Async Support:**
```python
from ensure_json import ensure_json_async

obj = await ensure_json_async(llm_output)
```

**Schema Validation (Optional):**
```python
from pydantic import BaseModel
from ensure_json import ensure_json

class User(BaseModel):
    name: str
    age: int

user = ensure_json(llm_output, schema=User)
# Returns validated User instance
```

**CLI:**
```bash
echo '{ name: "Alice" }' | ensure-json
cat llm-output.txt | ensure-json > fixed.json
```

📚 [Full Python Docs →](ensure-py/README.md)

</td>
<td width="50%">

### 🟨 JavaScript / TypeScript

**Basic Usage:**
```typescript
import { ensureJson } from 'ensure-json';

// Fix LLM output
const broken = '```json\n{ name: "Alice", age: 42, }\n```';
const obj = ensureJson(broken);
console.log(obj); // { name: "Alice", age: 42 }
```

**With Error Handling:**
```typescript
import { ensureJson, JsonFixError } from 'ensure-json';

try {
    const obj = ensureJson(llmOutput);
} catch (err) {
    if (err instanceof JsonFixError) {
        console.log(`Failed: ${err.message}`);
        console.log(`Raw input: ${err.raw}`);
    }
}
```

**Async Support:**
```typescript
import { ensureJsonAsync } from 'ensure-json';

const obj = await ensureJsonAsync(llmOutput);
```

**Schema Validation (Optional):**
```typescript
import { z } from 'zod';
import { ensureJson } from 'ensure-json';

const UserSchema = z.object({
    name: z.string(),
    age: z.number()
});

const user = ensureJson(llmOutput, UserSchema);
// Returns validated & typed object
```

**CLI:**
```bash
echo '{ name: "Alice" }' | npx ensure-json
cat llm-output.txt | npx ensure-json > fixed.json
```

📚 [Full JavaScript Docs →](ensure-js/README.md)

</td>
</tr>
</table>

---

## 🔍 How It Works

ensureJson uses a **7-step repair pipeline** to transform "almost-JSON" into valid JSON:

1. **🧹 Strip Markdown Fences** - Removes ` ```json ` code blocks
2. **✂️ Extract JSON** - Finds first `{` or `[` and extracts the JSON portion
3. **🔪 Remove Trailing Commas** - Fixes `, }` and `, ]` patterns
4. **💬 Quote Conversion** - Changes `'key':` to `"key":`
5. **🏷️ Quote Bare Keys** - Transforms `{name:` to `{"name":`
6. **⚖️ Balance Brackets** - Adds missing closing `}` or `]`
7. **✅ Parse & Validate** - Uses native JSON parser to validate

**Result:** Clean, valid JSON every time.

---

## 🎬 Examples

### Example 1: LLM Markdown Output
```python
llm_output = '''
Here's the user data:
```json
{
  name: "Alice",
  email: 'alice@example.com',
  age: 30,
}
```
'''

result = ensure_json(llm_output)
# ✅ {'name': 'Alice', 'email': 'alice@example.com', 'age': 30}
```

### Example 2: Incomplete JSON
```typescript
const broken = '{"users": [{"name": "Alice"}, {"name": "Bob"';
const fixed = ensureJson(broken);
// ✅ {users: [{name: "Alice"}, {name: "Bob"}]}
```

### Example 3: Mixed Quotes
```python
messy = "{name: 'Alice', 'age': 30, \"city\": 'NYC'}"
clean = ensure_json(messy)
# ✅ {'name': 'Alice', 'age': 30, 'city': 'NYC'}
```

🔗 [**More Examples →**](examples/)

---

## 🎯 Use Cases

- **🤖 LLM Applications** - Parse structured output from GPT, Claude, Gemini, etc.
- **🔄 Data Pipelines** - Clean JSON from unreliable sources
- **🧪 Testing** - Fix malformed test fixtures
- **📝 Content Processing** - Extract JSON from markdown or mixed content
- **🛠️ Developer Tools** - Build robust JSON parsers for CLI tools
- **📊 Data Science** - Clean JSON data for analysis

---

## 🆚 Comparison

| Feature | ensureJson | `json.loads()` | Other Fixers |
|---------|-----------|----------------|--------------|
| Fixes markdown fences | ✅ | ❌ | ⚠️ Sometimes |
| Handles trailing commas | ✅ | ❌ | ✅ |
| Quotes bare keys | ✅ | ❌ | ⚠️ Limited |
| Balances brackets | ✅ | ❌ | ❌ |
| Cross-platform (Py + JS) | ✅ | ⚠️ Python only | ❌ |
| Zero dependencies | ✅ | ✅ | ❌ |
| Schema validation | ✅ | ❌ | ❌ |
| TypeScript support | ✅ | N/A | ⚠️ Varies |

---

## 🏗️ Project Structure

```
ensureJson/
├── ensure-py/          # Python package (PyPI: ensure-json)
│   ├── ensure_json.py  # Core implementation
│   ├── cli.py          # Command-line interface
│   └── test/           # Test suite
├── ensure-js/          # JavaScript/TypeScript package (npm: ensure-json)
│   ├── src/
│   │   ├── ensureJson.ts  # Core implementation
│   │   ├── cli.ts         # Command-line interface
│   │   └── index.ts       # Exports
│   └── test.js         # Test suite
├── examples/           # Usage examples
├── docs/              # Additional documentation
├── .github/           # GitHub templates and workflows
├── CONTRIBUTING.md    # Contribution guidelines
├── CODE_OF_CONDUCT.md # Community guidelines
├── SECURITY.md        # Security policy
└── README.md          # You are here
```

---

## 🤝 Contributing

We love contributors! ensureJson is **beginner-friendly** and we're here to help.

### 🌟 Quick Start for Contributors

1. **🍴 Fork the repo** and clone it locally
2. **🔧 Set up your environment:**
   ```bash
   # Python
   cd ensure-py
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -e .

   # JavaScript
   cd ensure-js
   npm install
   ```
3. **🌿 Create a branch:** `git checkout -b feature/your-feature`
4. **✨ Make your changes** and add tests
5. **✅ Run tests:**
   ```bash
   # Python: python test/test.py
   # JavaScript: npm test
   ```
6. **📤 Submit a PR!**

### 🎯 Good First Issues

New to open source? Start here:
- [Good First Issues](https://github.com/josharsh/ensureJson/labels/good%20first%20issue)
- [Help Wanted](https://github.com/josharsh/ensureJson/labels/help%20wanted)
- [Documentation](https://github.com/josharsh/ensureJson/labels/documentation)

### 📖 Contribution Areas

- 📝 **Documentation** - Improve guides, add examples, fix typos
- 🧪 **Testing** - Add test cases, improve coverage
- 🐛 **Bug Fixes** - Fix issues, improve error handling
- ✨ **Features** - Add new functionality
- 🎨 **Examples** - Create real-world usage examples
- 🌍 **Community** - Answer questions, review PRs

[**Read the Full Contributing Guide →**](CONTRIBUTING.md)

---

## 🗺️ Roadmap

### ✅ Current (v0.1.x)
- Core JSON repair functionality
- Python and JavaScript packages
- CLI tools
- Schema validation support

### 🚧 Upcoming (v0.2.x)
- [ ] Improved error messages with suggestions
- [ ] Support for JSONL (JSON Lines) format
- [ ] Performance benchmarks and optimizations
- [ ] VSCode extension for JSON repair
- [ ] Web playground for testing repairs
- [ ] Support for JSON5 syntax

### 🔮 Future (v1.0+)
- [ ] Streaming JSON repair for large files
- [ ] AI-powered repair suggestions
- [ ] Integration with popular LLM libraries
- [ ] Rust implementation for better performance
- [ ] Browser extension for debugging LLM outputs

**Have ideas?** [Open an issue](https://github.com/josharsh/ensureJson/issues) or start a [discussion](https://github.com/josharsh/ensureJson/discussions)!

---

## 💬 Community

- 💡 **Discussions** - [GitHub Discussions](https://github.com/josharsh/ensureJson/discussions)
- 🐛 **Bug Reports** - [GitHub Issues](https://github.com/josharsh/ensureJson/issues)
- 🌟 **Feature Requests** - [GitHub Issues](https://github.com/josharsh/ensureJson/issues/new?template=feature_request.yml)
- 📢 **Twitter** - Share your projects using #ensureJson

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ by [Harsh Joshi](https://github.com/josharsh) and [contributors](https://github.com/josharsh/ensureJson/graphs/contributors).

Special thanks to:
- The LLM community for inspiration
- All our amazing contributors
- Open source tools that made this possible

---

## ⭐ Star History

If you find ensureJson useful, please consider starring the repo! It helps others discover the project.

[![Star History Chart](https://api.star-history.com/svg?repos=josharsh/ensureJson&type=Date)](https://star-history.com/#josharsh/ensureJson&Date)

---

<div align="center">

**[⬆ Back to Top](#-ensurejson)**

Made with ❤️ for the developer community

[Report Bug](https://github.com/josharsh/ensureJson/issues) • [Request Feature](https://github.com/josharsh/ensureJson/issues) • [Contribute](CONTRIBUTING.md)

</div>
