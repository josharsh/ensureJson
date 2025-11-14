# Architecture

This document provides an in-depth look at the architecture and implementation details of ensureJson.

## Table of Contents

- [Overview](#overview)
- [Design Principles](#design-principles)
- [Core Algorithm](#core-algorithm)
- [Implementation Details](#implementation-details)
- [Error Handling](#error-handling)
- [Performance Considerations](#performance-considerations)
- [Future Improvements](#future-improvements)

## Overview

ensureJson is designed as a **monorepo** containing two independent but functionally identical packages:

```
ensureJson/
├── ensure-py/    # Python implementation
└── ensure-js/    # JavaScript/TypeScript implementation
```

Both packages implement the same **7-step repair pipeline** algorithm with identical behavior across platforms.

## Design Principles

### 1. **Simplicity First**
- Core functionality has zero dependencies
- Small, focused codebase (<100 lines per implementation)
- Easy to understand and audit

### 2. **Cross-Platform Consistency**
- Python and JavaScript implementations behave identically
- Same API surface across both platforms
- Consistent error messages and behavior

### 3. **Progressive Enhancement**
- Core works with zero dependencies
- Optional schema validation via Pydantic/Zod
- Async support for integration with async codebases

### 4. **Fail-Safe Design**
- Preserves original input on error (via `err.raw`)
- Clear error messages
- No silent failures

### 5. **Developer Experience**
- TypeScript-first for JavaScript package
- Type hints for Python package
- CLI tools for quick testing
- Comprehensive error information

## Core Algorithm

The repair pipeline consists of 7 sequential steps. Each step is designed to be **idempotent** and **composable**.

### Step 1: Remove Markdown Fences

**Purpose:** Strip markdown code blocks that LLMs often wrap around JSON output.

**Pattern:** ` ```json...``` ` or ` ```...``` `

**Implementation:**
```python
# Python
text = re.sub(r'```(?:json)?\s*\n?', '', text)
text = re.sub(r'\n?```', '', text)
```

```typescript
// TypeScript
text = text.replace(/```(?:json)?\s*\n?/g, '')
            .replace(/\n?```/g, '');
```

**Why it matters:** LLMs frequently wrap JSON in markdown code fences for readability.

---

### Step 2: Slice to First Brace/Bracket

**Purpose:** Extract the JSON portion from surrounding text.

**Algorithm:**
1. Find the index of the first `{` or `[`
2. Slice the string from that index
3. If no brace found, continue with original text

**Implementation:**
```python
# Python
start = min(
    (text.find('{'), text.find('['))
    if text.find('{') >= 0 and text.find('[') >= 0
    else (text.find('{') if text.find('{') >= 0 else text.find('['))
)
if start > 0:
    text = text[start:]
```

**Why it matters:** LLMs often include explanatory text before the JSON.

---

### Step 3: Remove Trailing Commas

**Purpose:** Fix invalid trailing commas in objects and arrays.

**Patterns:** `, }` and `, ]`

**Implementation:**
```python
# Python
text = re.sub(r',\s*}', '}', text)
text = re.sub(r',\s*]', ']', text)
```

**Why it matters:** Trailing commas are invalid in standard JSON (though valid in JSON5).

---

### Step 4: Single → Double Quotes for Keys

**Purpose:** Convert single-quoted keys to double-quoted keys.

**Pattern:** `'key':` → `"key":`

**Implementation:**
```python
# Python
text = re.sub(r"'(\w+)':", r'"\1":', text)
```

**Edge cases handled:**
- Keys with underscores, numbers, letters
- Keys with hyphens (requires more complex regex)

**Why it matters:** JSON spec requires double quotes for keys.

---

### Step 5: Quote Bare Keys

**Purpose:** Add quotes around unquoted keys.

**Pattern:** `{key:` → `{"key":`

**Implementation:**
```python
# Python
text = re.sub(r'(\{|,)\s*(\w+):', r'\1"\2":', text)
```

**Why it matters:** JavaScript object notation allows bare keys, but JSON doesn't.

---

### Step 6: Balance Braces/Brackets

**Purpose:** Add missing closing braces and brackets.

**Algorithm:**
```python
def balance_brackets(text: str) -> str:
    open_count = text.count('{') - text.count('}')
    if open_count > 0:
        text += '}' * open_count

    open_count = text.count('[') - text.count(']')
    if open_count > 0:
        text += ']' * open_count

    return text
```

**Why it matters:** LLMs sometimes generate incomplete JSON, especially when hitting token limits.

---

### Step 7: Parse & Validate

**Purpose:** Validate the repaired JSON and convert to object.

**Implementation:**
```python
# Python
try:
    obj = json.loads(text)
    return obj
except json.JSONDecodeError as e:
    raise JsonFixError(f"Could not parse JSON: {e}", raw=original_input)
```

**Why it matters:** Final validation ensures the output is valid JSON.

---

## Implementation Details

### Python Implementation (`ensure-py/ensure_json.py`)

**Key components:**

1. **`ensure_json(text: str, schema=None) -> Any`**
   - Main synchronous API
   - Runs the 7-step pipeline
   - Optional Pydantic schema validation

2. **`ensure_json_async(text: str, schema=None) -> Any`**
   - Asynchronous wrapper
   - Currently just wraps sync version (no I/O involved)
   - Future: Could support streaming repair for large inputs

3. **`JsonFixError` exception**
   - Custom exception with `.raw` property
   - Preserves original input for debugging

**Dependencies:**
- Core: `json`, `re` (stdlib only)
- Optional: `pydantic` for schema validation

---

### JavaScript Implementation (`ensure-js/src/ensureJson.ts`)

**Key components:**

1. **`ensureJson(text: string, schema?: ZodSchema): any`**
   - Main synchronous API
   - TypeScript with strict typing
   - Optional Zod schema validation

2. **`ensureJsonAsync(text: string, schema?: ZodSchema): Promise<any>`**
   - Asynchronous wrapper
   - Returns Promise for consistency with async APIs

3. **`JsonFixError` class**
   - Extends `Error`
   - Includes `.raw` property for original input

**Dependencies:**
- Production: `zod` (for schema validation)
- Dev: `typescript`, `tsup`, `biome`

---

## Error Handling

### Error Hierarchy

```
Error
└── JsonFixError
    ├── message: string       # Human-readable error
    └── raw: string          # Original input
```

### Error Scenarios

1. **Completely invalid input**
   ```python
   ensure_json("not json at all")
   # Raises: JsonFixError("Could not parse JSON: ...")
   ```

2. **Schema validation failure**
   ```python
   ensure_json('{"age": "not a number"}', schema=UserSchema)
   # Raises: ValidationError (Pydantic) or ZodError (Zod)
   ```

3. **Empty input**
   ```python
   ensure_json("")
   # Raises: JsonFixError("Could not parse JSON: ...")
   ```

### Error Recovery

The `.raw` property allows users to inspect the original input:

```python
try:
    obj = ensure_json(llm_output)
except JsonFixError as err:
    logger.error(f"Failed to parse: {err.message}")
    logger.debug(f"Original input: {err.raw}")
    # Can re-prompt LLM with error feedback
```

---

## Performance Considerations

### Time Complexity

- **Regex operations:** O(n) where n is input length
- **String operations:** O(n)
- **JSON parsing:** O(n)
- **Overall:** O(n) linear time

### Space Complexity

- **String copying:** O(n) for intermediate strings
- **Overall:** O(n) space

### Optimizations

1. **Early exit:** If input is already valid JSON, parsing succeeds immediately
2. **Lazy compilation:** Regex patterns are compiled once (Python `re` module caches)
3. **Minimal allocations:** Few intermediate string allocations

### Benchmarks

See [BENCHMARKS.md](BENCHMARKS.md) for detailed performance metrics.

**Typical performance:**
- Small inputs (<1KB): <1ms
- Medium inputs (1-10KB): 1-5ms
- Large inputs (100KB+): 10-50ms

---

## Future Improvements

### Planned Enhancements

1. **Streaming Support**
   - Process large JSON files incrementally
   - Lower memory footprint for huge inputs

2. **Better Error Messages**
   - Suggest specific fixes
   - Highlight problematic sections
   - "Did you mean..." suggestions

3. **JSON5 Support**
   - Allow comments in JSON
   - Support additional syntax (trailing commas as valid)
   - Configurable strictness levels

4. **Performance Optimizations**
   - Rust implementation for hot path
   - WASM for browser usage
   - JIT compilation for regex patterns

5. **Context-Aware Repair**
   - Learn from common LLM output patterns
   - Model-specific repair strategies (GPT vs Claude vs Gemini)

### Research Directions

1. **ML-Based Repair**
   - Train model on LLM outputs and their repairs
   - Predict likely intended JSON structure

2. **Interactive Repair**
   - CLI that shows repair steps
   - Allow manual intervention at each step

3. **Fuzzing & Testing**
   - Property-based testing with hypothesis/fast-check
   - Fuzzing to find edge cases

---

## Contributing

If you're interested in contributing to the architecture:

1. **Performance improvements** - Always welcome, but benchmark first
2. **New repair steps** - Open an issue to discuss before implementing
3. **Algorithm changes** - Must maintain Python/JS consistency

See [CONTRIBUTING.md](../CONTRIBUTING.md) for full guidelines.

---

## References

- [JSON Specification (RFC 8259)](https://tools.ietf.org/html/rfc8259)
- [JSON5 Specification](https://json5.org/)
- [LLM Output Patterns Study](#) (TODO: Add research)

---

**Last Updated:** 2025-11-14
