# Contributing to ensureJson

Thank you for your interest in contributing! 🎉  
We welcome contributions of all kinds—bug fixes, new features, documentation, and more. This project is a monorepo containing both a Python package (`ensure-py`) and a JavaScript/TypeScript package (`ensure-js`).

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
  - [Python (ensure-py)](#python-ensure-py)
  - [JavaScript/TypeScript (ensure-js)](#javascripttypescript-ensure-js)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Proposing Changes](#proposing-changes)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)
- [Code of Conduct](#code-of-conduct)
- [Getting Help](#getting-help)
- [Release Process](#release-process)

---

## Getting Started

1. **Fork** this repository and clone your fork locally.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b my-feature
   ```
3. Make your changes, add tests if needed, and commit.
4. Push your branch and open a Pull Request (PR) on GitHub.

---

## Development Setup

### Python (`ensure-py`)

- Requires Python 3.7+
- Recommended: use a virtual environment

```bash
cd ensureJson/ensure-py
python3 -m venv venv
source venv/bin/activate
pip install -e .[schema]  # Installs pydantic for schema validation
```

- To run the CLI:
  ```bash
  echo '{ name: "Alice", age: 42, }' | python -m ensure_py.cli
  ```

- To run tests:
  ```bash
  python test/test.py
  ```

### JavaScript/TypeScript (`ensure-js`)

- Requires Node.js 18+ and npm or pnpm

```bash
cd ensureJson/ensure-js
npm install
npm run build
```

- To run the CLI:
  ```bash
  echo '{ name: "Alice", age: 42, }' | npx ensure-json
  ```

- To run tests:
  ```bash
  node test.js
  ```

---

## Coding Standards

- **Python:** Follow [PEP8](https://peps.python.org/pep-0008/). Use type hints where possible.
- **JavaScript/TypeScript:** Use modern ES2020+ syntax and TypeScript best practices.
- Linting:
  - Python: Use `flake8` or `black` if available.
  - JS/TS: Use `biome check .` (see package.json scripts).

- Write clear, concise docstrings and comments.
- Keep code dependency-free unless absolutely necessary.

---

## Testing

- Add or update tests for any new features or bug fixes.
- Keep tests minimal and focused.
- For Python, place tests in `ensure-py/test/`.
- For JS/TS, use `ensure-js/test.js` or add to a `test/` directory if expanding.

---

## Proposing Changes

- Open an [issue](https://github.com/your-repo/issues) to discuss major changes before starting work.
- For small fixes, feel free to submit a PR directly.
- Reference related issues in your PR description.

---

## Commit Messages

- Use clear, descriptive commit messages.
- Example: `Fix: handle trailing commas in ensure_json.py`
- For multi-package changes, mention both: `Docs: update usage in ensure-py and ensure-js`

---

## Pull Requests

- Ensure your branch is up to date with `main`.
- All tests should pass before requesting review.
- Fill out the PR template with a summary of your changes.

---

## Code of Conduct

Be respectful and inclusive. See [Contributor Covenant](https://www.contributor-covenant.org/) for guidelines.

---

## Getting Help

- For questions, open a [discussion](https://github.com/your-repo/discussions) or [issue](https://github.com/your-repo/issues).
- You can also reach out via email if listed in the repo.

---

## Release Process

- Bump the version in `setup.py` (Python) or `package.json` (JS) for new releases.
- Update the changelog if present.
- Publish to [PyPI](https://pypi.org/project/ensure-py/) and [npm](https://www.npmjs.com/package/ensure-json) as appropriate.
- Tag the release on GitHub.

---

Thank you for helping make ensureJson better!
