# ensureJson Examples

Real-world examples demonstrating how to use ensureJson in various scenarios.

## Directory Structure

```
examples/
├── python/           # Python examples
│   ├── basic.py
│   ├── with_openai.py
│   ├── with_anthropic.py
│   ├── async_usage.py
│   ├── schema_validation.py
│   └── error_handling.py
├── javascript/       # JavaScript/TypeScript examples
│   ├── basic.js
│   ├── with_openai.ts
│   ├── with_anthropic.ts
│   ├── async_usage.ts
│   ├── schema_validation.ts
│   └── error_handling.js
└── README.md         # This file
```

## Running Examples

### Python Examples

```bash
cd examples/python

# Basic usage
python basic.py

# With OpenAI
pip install openai
python with_openai.py

# With Anthropic Claude
pip install anthropic
python with_anthropic.py

# Async usage
python async_usage.py

# Schema validation
pip install pydantic
python schema_validation.py

# Error handling
python error_handling.py
```

### JavaScript Examples

```bash
cd examples/javascript

# Basic usage
node basic.js

# With OpenAI (TypeScript)
npm install openai tsx
npx tsx with_openai.ts

# With Anthropic Claude (TypeScript)
npm install @anthropic-ai/sdk tsx
npx tsx with_anthropic.ts

# Async usage (TypeScript)
npx tsx async_usage.ts

# Schema validation (TypeScript)
npm install zod tsx
npx tsx schema_validation.ts

# Error handling
node error_handling.js
```

## Example Scenarios

### 1. Basic JSON Repair

Demonstrates the simplest use case: repairing broken JSON from any source.

- Python: `python/basic.py`
- JavaScript: `javascript/basic.js`

### 2. OpenAI Integration

Shows how to use ensureJson with OpenAI's GPT models to parse structured outputs.

- Python: `python/with_openai.py`
- JavaScript: `javascript/with_openai.ts`

### 3. Anthropic Claude Integration

Demonstrates using ensureJson with Anthropic's Claude API.

- Python: `python/with_anthropic.py`
- JavaScript: `javascript/with_anthropic.ts`

### 4. Async/Await Patterns

Examples of using ensureJson in asynchronous code.

- Python: `python/async_usage.py`
- JavaScript: `javascript/async_usage.ts`

### 5. Schema Validation

Shows how to validate repaired JSON against a schema using Pydantic (Python) or Zod (JavaScript).

- Python: `python/schema_validation.py`
- JavaScript: `javascript/schema_validation.ts`

### 6. Error Handling

Best practices for handling errors and recovering from failures.

- Python: `python/error_handling.py`
- JavaScript: `javascript/error_handling.js`

## Contributing Examples

Have a great use case? We'd love to see it!

1. Create your example file
2. Add documentation
3. Test it works
4. Submit a PR

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

## Need Help?

- 💬 [GitHub Discussions](https://github.com/josharsh/ensureJson/discussions)
- 🐛 [Report an Issue](https://github.com/josharsh/ensureJson/issues)
- 📖 [Full Documentation](../docs/)
