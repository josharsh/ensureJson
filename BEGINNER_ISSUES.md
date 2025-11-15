# Beginner-Friendly Issues Guide

This document contains a list of beginner-friendly tasks that can be turned into GitHub issues. These are perfect for first-time contributors!

## 📝 Documentation Issues

### DOC-001: Add More Examples to Python README
**Difficulty:** Very Easy
**Time:** 30 minutes
**Skills:** Python, Markdown
**Description:** Add 2-3 more usage examples to `ensure-py/README.md`
**Files:** `ensure-py/README.md`
**Acceptance Criteria:**
- Add examples for edge cases (nested JSON, arrays, etc.)
- Include code comments
- Test that examples work

### DOC-002: Add More Examples to JavaScript README
**Difficulty:** Very Easy
**Time:** 30 minutes
**Skills:** JavaScript, Markdown
**Description:** Add 2-3 more usage examples to `ensure-js/README.md`
**Files:** `ensure-js/README.md`
**Acceptance Criteria:**
- Add examples for edge cases
- Include TypeScript examples
- Test that examples work

### DOC-003: Create Getting Started Guide
**Difficulty:** Easy
**Time:** 1-2 hours
**Skills:** Markdown, Writing
**Description:** Create a `docs/GETTING_STARTED.md` guide for absolute beginners
**Acceptance Criteria:**
- Step-by-step installation guide
- First example walkthrough
- Common pitfalls section
- Links to additional resources

### DOC-004: Add JSDoc Comments to TypeScript Code
**Difficulty:** Easy
**Time:** 1-2 hours
**Skills:** TypeScript, JSDoc
**Description:** Add comprehensive JSDoc comments to `ensure-js/src/ensureJson.ts`
**Files:** `ensure-js/src/ensureJson.ts`
**Acceptance Criteria:**
- Add JSDoc to all exported functions
- Include @param and @returns tags
- Add @example tags with code examples
- Ensure TypeScript compiler recognizes them

### DOC-005: Create Video Tutorial Script
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** Writing, Technical Communication
**Description:** Write a script for a 5-minute video tutorial on using ensureJson
**Acceptance Criteria:**
- Cover installation
- Show basic example
- Demonstrate schema validation
- Include troubleshooting tips

## 🧪 Testing Issues

### TEST-001: Add Test Cases for Markdown Fence Removal
**Difficulty:** Easy
**Time:** 1 hour
**Skills:** Python OR JavaScript
**Description:** Add more test cases for markdown fence removal in both packages
**Files:** `ensure-py/test/test.py`, `ensure-js/test.js`
**Acceptance Criteria:**
- Add tests for various markdown formats
- Test nested code blocks
- Test missing closing fences
- All tests pass

### TEST-002: Add Test Cases for Edge Cases
**Difficulty:** Medium
**Time:** 2 hours
**Skills:** Python OR JavaScript, Testing
**Description:** Create comprehensive edge case tests
**Test Cases:**
- Empty strings
- Very long strings (100KB+)
- Unicode characters
- Deeply nested objects (10+ levels)
- Mixed quote styles
**Acceptance Criteria:**
- At least 10 new test cases
- Tests pass on all platforms
- Document each test case

### TEST-003: Add Schema Validation Tests
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** Python (Pydantic) OR JavaScript (Zod)
**Description:** Create comprehensive tests for schema validation
**Files:** Create new test files
**Acceptance Criteria:**
- Test valid schema cases
- Test invalid schema cases
- Test optional fields
- Test nested schemas
- 90%+ code coverage for schema validation

### TEST-004: Create Performance Benchmark Suite
**Difficulty:** Hard
**Time:** 4+ hours
**Skills:** Python OR JavaScript, Benchmarking
**Description:** Create automated benchmark suite
**Acceptance Criteria:**
- Benchmark different input sizes
- Compare with standard JSON.parse()
- Generate performance report
- Add to CI/CD pipeline

## 🎨 Examples Issues

### EX-001: Create Flask API Example
**Difficulty:** Easy
**Time:** 1-2 hours
**Skills:** Python, Flask
**Description:** Create a Flask API that uses ensureJson
**Files:** Create `examples/python/flask_api.py`
**Acceptance Criteria:**
- POST endpoint that accepts broken JSON
- Returns repaired JSON
- Includes error handling
- Includes README with usage

### EX-002: Create Express.js API Example
**Difficulty:** Easy
**Time:** 1-2 hours
**Skills:** JavaScript, Express.js
**Description:** Create an Express.js API that uses ensureJson
**Files:** Create `examples/javascript/express_api.ts`
**Acceptance Criteria:**
- POST endpoint that accepts broken JSON
- Returns repaired JSON
- TypeScript implementation
- Includes README with usage

### EX-003: Create Streamlit App Example
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** Python, Streamlit
**Description:** Create a web app for testing ensureJson
**Files:** Create `examples/python/streamlit_app.py`
**Acceptance Criteria:**
- Text input for broken JSON
- Display repaired JSON
- Show repair steps
- Deploy to Streamlit Cloud

### EX-004: Create React Web App
**Difficulty:** Medium
**Time:** 3-4 hours
**Skills:** React, TypeScript
**Description:** Create a React app for testing ensureJson in the browser
**Files:** Create `examples/javascript/react-app/`
**Acceptance Criteria:**
- Input field for broken JSON
- Display repaired JSON
- Syntax highlighting
- Copy to clipboard button

### EX-005: Create LangChain Integration Example
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** Python, LangChain
**Description:** Show how to use ensureJson with LangChain
**Files:** Create `examples/python/with_langchain.py`
**Acceptance Criteria:**
- Parse LangChain LLM outputs
- Handle structured output chains
- Include error recovery
- README with explanation

## 🔧 Code Quality Issues

### CODE-001: Add Type Hints to Python Package
**Difficulty:** Easy
**Time:** 1-2 hours
**Skills:** Python, Type Hints
**Description:** Add comprehensive type hints to all Python functions
**Files:** `ensure-py/ensure_json.py`, `ensure-py/cli.py`
**Acceptance Criteria:**
- All functions have type hints
- mypy passes with strict mode
- Update CI to check types

### CODE-002: Improve Error Messages
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** Python OR JavaScript
**Description:** Make error messages more helpful
**Acceptance Criteria:**
- Include suggestions for fixes
- Show where parsing failed
- Add error codes
- Update documentation

### CODE-003: Add Logging Support
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** Python OR JavaScript
**Description:** Add optional logging to show repair steps
**Acceptance Criteria:**
- Log each repair step
- Configurable log levels
- No performance impact when disabled
- Documentation with examples

### CODE-004: Setup Black/Prettier Auto-formatting
**Difficulty:** Easy
**Time:** 1 hour
**Skills:** Git, CI/CD
**Description:** Add auto-formatting checks to CI
**Acceptance Criteria:**
- Configure black for Python
- Configure prettier for JavaScript
- Add pre-commit hooks
- Update CONTRIBUTING.md

## 🌐 Internationalization Issues

### I18N-001: Add Spanish Translation for README
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** Spanish, Markdown
**Description:** Create `README.es.md` with Spanish translation
**Acceptance Criteria:**
- Complete translation of main README
- Update links to work correctly
- Get review from native speaker

### I18N-002: Add French Translation for README
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** French, Markdown
**Description:** Create `README.fr.md` with French translation

### I18N-003: Add Chinese Translation for README
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** Chinese, Markdown
**Description:** Create `README.zh.md` with Chinese translation

## 🚀 Feature Issues

### FEAT-001: Add JSONL Support
**Difficulty:** Hard
**Time:** 4+ hours
**Skills:** Python OR JavaScript, Algorithms
**Description:** Add support for repairing JSON Lines format
**Acceptance Criteria:**
- Parse multiple JSON objects separated by newlines
- Return array of repaired objects
- Handle partial lines
- Add tests and documentation

### FEAT-002: Add Verbose Mode
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** Python OR JavaScript
**Description:** Add verbose mode that shows repair steps
**Acceptance Criteria:**
- `--verbose` flag for CLI
- Function parameter for library
- Log each repair step
- Show before/after for each step

### FEAT-003: Add Web Playground
**Difficulty:** Hard
**Time:** 6+ hours
**Skills:** React, TypeScript, Vercel
**Description:** Create and deploy web playground
**Acceptance Criteria:**
- Interactive editor
- Real-time repair
- Share results via URL
- Deploy to Vercel/Netlify

## 🐛 Bug Fix Issues

### BUG-001: Handle Empty Input Gracefully
**Difficulty:** Easy
**Time:** 30 minutes
**Skills:** Python OR JavaScript
**Description:** Return better error message for empty input
**Files:** Core implementation files
**Acceptance Criteria:**
- Detect empty/whitespace-only input
- Return helpful error message
- Add test cases

### BUG-002: Fix Unicode Handling
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** Python OR JavaScript, Unicode
**Description:** Ensure proper Unicode character handling
**Acceptance Criteria:**
- Handle emoji in JSON
- Handle multi-byte characters
- Add Unicode test cases
- Works on all platforms

## 🎓 Educational Issues

### EDU-001: Create Jupyter Notebook Tutorial
**Difficulty:** Medium
**Time:** 3-4 hours
**Skills:** Python, Jupyter
**Description:** Create interactive tutorial notebook
**Files:** Create `examples/python/tutorial.ipynb`
**Acceptance Criteria:**
- Step-by-step tutorial
- Interactive code cells
- Real LLM examples
- Publish to Google Colab

### EDU-002: Create YouTube Tutorial
**Difficulty:** Medium
**Time:** 4-6 hours
**Skills:** Video Editing, Presentation
**Description:** Create a YouTube tutorial video
**Acceptance Criteria:**
- 5-10 minute video
- Cover installation and basic usage
- Show real-world example
- Upload with good description and tags

## 📊 Infrastructure Issues

### INFRA-001: Setup Code Coverage Reporting
**Difficulty:** Medium
**Time:** 2-3 hours
**Skills:** CI/CD, GitHub Actions
**Description:** Add code coverage reporting to CI
**Acceptance Criteria:**
- Integrate Codecov or Coveralls
- Add badge to README
- Fail CI if coverage drops
- Generate coverage reports

### INFRA-002: Setup Dependabot
**Difficulty:** Easy
**Time:** 30 minutes
**Skills:** GitHub
**Description:** Configure Dependabot for dependency updates
**Files:** Create `.github/dependabot.yml`
**Acceptance Criteria:**
- Configure for both Python and JavaScript
- Weekly update schedule
- Auto-approve patch versions

### INFRA-003: Setup GitHub Discussions
**Difficulty:** Easy
**Time:** 1 hour
**Skills:** GitHub
**Description:** Enable and configure GitHub Discussions
**Acceptance Criteria:**
- Enable Discussions
- Create categories (Q&A, Ideas, Show & Tell)
- Pin welcome message
- Update README with link

## 🎯 How to Claim an Issue

1. **Check if it's available** - Look for the `available` label
2. **Comment on the issue** - Say you'd like to work on it
3. **Wait for assignment** - A maintainer will assign it to you
4. **Start working** - Follow the acceptance criteria
5. **Ask questions** - Comment if you need help!
6. **Submit PR** - Reference the issue number

## 🏆 Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Thanked in release notes
- Featured in README (significant contributions)
- Invited to become maintainers (consistent contributors)

## 📬 Questions?

- 💬 [GitHub Discussions](https://github.com/josharsh/ensureJson/discussions)
- 🐛 [Open an Issue](https://github.com/josharsh/ensureJson/issues)

---

**Last Updated:** 2025-11-14
