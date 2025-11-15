# Troubleshooting Guide

Solutions to common problems when using ensureJson.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Runtime Errors](#runtime-errors)
- [Unexpected Behavior](#unexpected-behavior)
- [Performance Issues](#performance-issues)
- [Schema Validation Issues](#schema-validation-issues)
- [CLI Issues](#cli-issues)
- [Still Stuck?](#still-stuck)

---

## Installation Issues

### Python: `pip install ensure-json` fails

**Problem:** Installation fails with error messages.

**Solution 1: Upgrade pip**
```bash
python -m pip install --upgrade pip
pip install ensure-json
```

**Solution 2: Use a virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install ensure-json
```

**Solution 3: Check Python version**
```bash
python --version  # Should be 3.7 or higher
```

If you're on Python <3.7, you'll need to upgrade Python first.

---

### JavaScript: `npm install ensure-json` fails

**Problem:** Installation fails with error messages.

**Solution 1: Clear npm cache**
```bash
npm cache clean --force
npm install ensure-json
```

**Solution 2: Update Node.js**
```bash
node --version  # Should be 18 or higher
```

If you're on Node <18, upgrade Node.js first: https://nodejs.org/

**Solution 3: Try a different package manager**
```bash
# Try pnpm
npm install -g pnpm
pnpm add ensure-json

# Or try yarn
npm install -g yarn
yarn add ensure-json
```

---

### Import Error: `ModuleNotFoundError: No module named 'ensure_json'`

**Problem:** Python can't find the module after installation.

**Diagnosis:**
```bash
pip show ensure-json  # Check if it's installed
python -c "import sys; print(sys.path)"  # Check Python path
```

**Solutions:**

1. **Wrong Python interpreter**
   ```bash
   # Make sure you're using the same Python that installed the package
   which python  # On Windows: where python
   python -m pip install ensure-json
   ```

2. **Virtual environment not activated**
   ```bash
   source venv/bin/activate
   ```

3. **Install in development mode** (if using from source)
   ```bash
   cd ensure-py
   pip install -e .
   ```

---

### TypeScript: Type errors with `ensureJson`

**Problem:** TypeScript can't find type definitions.

**Solution 1: Check installation**
```bash
npm list ensure-json
```

**Solution 2: Restart TypeScript server** (in VS Code)
- Cmd/Ctrl + Shift + P
- "TypeScript: Restart TS Server"

**Solution 3: Check tsconfig.json**
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

---

## Runtime Errors

### `JsonFixError: Could not parse JSON`

**Problem:** ensureJson can't repair the input.

**Diagnosis:**
```python
from ensure_json import ensure_json, JsonFixError

try:
    obj = ensure_json(broken_json)
except JsonFixError as err:
    print("Error:", err.message)
    print("Raw input:", err.raw)
    print("Input length:", len(err.raw))
```

**Common Causes:**

1. **Input is not JSON-like at all**
   ```python
   ensure_json("Hello world")  # ❌ No JSON structure
   ```

   **Solution:** Make sure your input contains `{` or `[`.

2. **Multiple JSON objects**
   ```python
   ensure_json('{"a": 1} {"b": 2}')  # ❌ Not supported yet
   ```

   **Solution:** Split into separate calls:
   ```python
   parts = input.split('} {')
   obj1 = ensure_json(parts[0] + '}')
   obj2 = ensure_json('{' + parts[1])
   ```

3. **Severely malformed JSON**
   ```python
   ensure_json('{{{invalid')  # ❌ Too broken
   ```

   **Solution:** Re-prompt your LLM with better instructions.

4. **Binary or non-text data**
   ```python
   ensure_json(binary_data)  # ❌ Can't repair binary data
   ```

   **Solution:** Make sure input is a string, not bytes.

---

### `TypeError: ensure_json() got an unexpected keyword argument 'schema'`

**Problem:** Schema parameter not working.

**Cause:** You might be using an older version without schema support.

**Solution:**
```bash
# Python
pip install --upgrade ensure-json

# JavaScript
npm update ensure-json
```

---

### Schema validation fails with `ValidationError` or `ZodError`

**Problem:** JSON parses fine, but schema validation fails.

**Diagnosis:**
```python
from ensure_json import ensure_json
import json

# First, check if JSON parses without schema
obj = ensure_json(input_text)  # No schema
print(json.dumps(obj, indent=2))  # See what you actually got

# Then try with schema
obj = ensure_json(input_text, schema=MySchema)  # With schema
```

**Solutions:**

1. **Data type mismatch**
   ```python
   # Schema expects age: int
   # But LLM returned age: "30" (string)

   # Solution: Use Pydantic's coercion
   from pydantic import BaseModel

   class User(BaseModel):
       age: int

       class Config:
           # Automatically convert "30" -> 30
           validate_assignment = True
   ```

2. **Missing required fields**
   ```python
   # Schema requires 'email' but it's missing

   # Solution: Make fields optional
   from typing import Optional
   from pydantic import BaseModel

   class User(BaseModel):
       name: str
       email: Optional[str] = None
   ```

3. **Extra fields not allowed**
   ```python
   # Pydantic by default forbids extra fields

   # Solution: Allow extra fields
   from pydantic import BaseModel

   class User(BaseModel):
       name: str

       class Config:
           extra = 'allow'  # or 'ignore'
   ```

---

## Unexpected Behavior

### Output doesn't match expectations

**Problem:** ensureJson returns valid JSON, but not what you expected.

**Debugging steps:**

1. **Print the input**
   ```python
   print("Input:", repr(input_text))
   ```

2. **Print the output**
   ```python
   import json
   obj = ensure_json(input_text)
   print("Output:", json.dumps(obj, indent=2))
   ```

3. **Check each repair step manually**

   Currently, you can't see individual steps, but you can simulate:
   ```python
   import re

   # Step 1: Remove markdown
   step1 = re.sub(r'```(?:json)?\s*\n?', '', input_text)
   step1 = re.sub(r'\n?```', '', step1)
   print("After step 1:", step1)

   # Step 2: Find first brace
   start = min((step1.find('{'), step1.find('[')), default=-1)
   step2 = step1[start:] if start >= 0 else step1
   print("After step 2:", step2)

   # ... and so on
   ```

---

### Keys are being quoted incorrectly

**Problem:** Single quotes converted to double quotes when you didn't want them to be.

**Example:**
```python
input = "{ message: 'don't do this' }"
# Output: {"message": "don"t do this"}  # ❌ Broken string
```

**Cause:** The regex can't distinguish between quotes in keys vs quotes in values.

**Solution:** Make sure your LLM outputs proper JSON in the first place. You can:
1. Improve your LLM prompt
2. Pre-process the input to escape quotes
3. Use schema validation to catch issues early

---

### Nested JSON is broken

**Problem:** Deeply nested JSON gets corrupted.

**Example:**
```python
input = '{"a": {"b": {"c": "value'
output = ensure_json(input)
# Missing closing braces added, but might not be in the right places
```

**Cause:** The bracket balancing is simple and just adds closing brackets at the end.

**Solution:**
1. Improve LLM prompt to output complete JSON
2. Set a max token limit for LLM that ensures complete output
3. Ask LLM to use simpler, flatter JSON structures

---

## Performance Issues

### ensureJson is slow for my use case

**Problem:** Takes too long to repair JSON.

**Diagnosis:**
```python
import time
from ensure_json import ensure_json

start = time.time()
obj = ensure_json(large_input)
elapsed = time.time() - start
print(f"Time: {elapsed:.3f}s")
print(f"Input size: {len(large_input)} bytes")
print(f"Throughput: {len(large_input)/elapsed:.0f} bytes/sec")
```

**Solutions:**

1. **Skip repair if not needed**
   ```python
   import json
   from ensure_json import ensure_json, JsonFixError

   # Try standard parser first (much faster)
   try:
       obj = json.loads(input)
   except json.JSONDecodeError:
       # Only use ensureJson if standard parser fails
       obj = ensure_json(input)
   ```

2. **Process in chunks**
   ```python
   # If you have multiple JSON objects
   chunks = input.split('\n')
   results = [ensure_json(chunk) for chunk in chunks]
   ```

3. **Use async for I/O-bound tasks**
   ```python
   from ensure_json import ensure_json_async

   results = await asyncio.gather(
       ensure_json_async(input1),
       ensure_json_async(input2),
       ensure_json_async(input3),
   )
   ```

4. **Consider alternatives for huge files**

   ensureJson is optimized for typical LLM outputs (<10KB). For 100KB+ inputs:
   - Use streaming JSON parsers
   - Split large files
   - Process in background workers

---

### Memory usage is too high

**Problem:** ensureJson uses too much memory.

**Cause:** Regex operations create intermediate strings.

**Solutions:**

1. **Process in smaller chunks**
2. **Use generators** (for batch processing)
   ```python
   def process_batch(inputs):
       for input in inputs:
           yield ensure_json(input)
           # Memory released after each iteration
   ```

3. **Clear references**
   ```python
   result = ensure_json(large_input)
   del large_input  # Free memory
   ```

---

## Schema Validation Issues

### Pydantic is not installed (Python)

**Problem:** `ImportError: No module named 'pydantic'`

**Solution:**
```bash
pip install pydantic
# Or install with schema validation extra
pip install 'ensure-json[validation]'  # If this extra is configured
```

### Zod errors are not helpful (JavaScript)

**Problem:** Zod errors are too verbose or unclear.

**Solution: Format Zod errors**
```typescript
import { ensureJson, JsonFixError } from 'ensure-json';
import { z } from 'zod';

try {
    const obj = ensureJson(input, schema);
} catch (err) {
    if (err instanceof z.ZodError) {
        console.error("Validation errors:");
        err.errors.forEach(e => {
            console.error(`  - ${e.path.join('.')}: ${e.message}`);
        });
    }
}
```

---

## CLI Issues

### `ensure-json: command not found` (Python)

**Problem:** CLI not available after installation.

**Solutions:**

1. **Make sure it's installed**
   ```bash
   pip show ensure-json
   ```

2. **Check if it's in PATH**
   ```bash
   python -m pip show ensure-json | grep Location
   # Add that location's bin/ directory to PATH
   ```

3. **Use Python module syntax**
   ```bash
   python -m ensure_json.cli
   ```

4. **Reinstall**
   ```bash
   pip uninstall ensure-json
   pip install ensure-json
   ```

---

### `npx ensure-json: command not found` (JavaScript)

**Problem:** CLI not available via npx.

**Solutions:**

1. **Make sure it's installed**
   ```bash
   npm list ensure-json
   ```

2. **Try with explicit package name**
   ```bash
   npx ensure-json@latest
   ```

3. **Install globally**
   ```bash
   npm install -g ensure-json
   ensure-json  # Now available globally
   ```

4. **Check npx version**
   ```bash
   npx --version
   npm install -g npm  # Update npm/npx
   ```

---

### CLI output is malformed

**Problem:** CLI outputs broken JSON.

**Diagnosis:**
```bash
echo '{ test: 123 }' | ensure-json | python -m json.tool
# If json.tool fails, output is not valid JSON
```

**Solutions:**

1. **Check input**
   ```bash
   echo '{ test: 123 }' > input.txt
   cat input.txt | ensure-json > output.txt
   cat output.txt  # Inspect the output
   ```

2. **Escape shell special characters**
   ```bash
   echo "{ \"test\": 123 }" | ensure-json
   # Or use single quotes to avoid escaping
   ```

---

## Still Stuck?

If none of these solutions work:

1. **Search existing issues:** [GitHub Issues](https://github.com/josharsh/ensureJson/issues)
2. **Ask in discussions:** [GitHub Discussions](https://github.com/josharsh/ensureJson/discussions)
3. **Open a new issue:** [New Issue](https://github.com/josharsh/ensureJson/issues/new?template=bug_report.yml)

When asking for help, please include:
- Your environment (Python/Node version, OS)
- Minimal reproducible example
- Expected vs actual behavior
- Error messages (full traceback)
- What you've already tried

---

**Last Updated:** 2025-11-14
