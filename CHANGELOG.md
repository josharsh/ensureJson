# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- CODE_OF_CONDUCT.md for community guidelines
- SECURITY.md for security vulnerability reporting
- CHANGELOG.md for tracking project changes
- Comprehensive GitHub issue templates
- Pull request template
- GitHub Actions CI/CD workflows
- Examples directory with real-world use cases
- Comprehensive test suites for both Python and JavaScript packages
- Benchmarks and performance documentation
- GitHub Discussion templates

### Changed
- Enhanced README with badges, demo, and better examples
- Improved documentation with ARCHITECTURE.md, FAQ.md, and TROUBLESHOOTING.md

### Fixed
- Package naming inconsistencies in documentation

## [0.1.1] - 2025-05-21

### Changed
- Updated ensure-py README for better end-user usage documentation
- Enhanced overall project documentation

### Added
- Comprehensive CONTRIBUTING.md with development guidelines

## [0.1.0] - Initial Release

### Added
- Python package (ensure-json on PyPI)
- JavaScript/TypeScript package (ensure-json on npm)
- Core JSON repair functionality with 7-step algorithm:
  - Remove markdown fences
  - Slice to first brace/bracket
  - Remove trailing commas
  - Convert single to double quotes for keys
  - Quote bare keys
  - Balance braces/brackets
  - Parse with native JSON parser
- Synchronous and asynchronous APIs
- Optional schema validation (Pydantic for Python, Zod for JavaScript)
- Command-line interfaces for both packages
- Basic test suites
- MIT License
- Initial documentation and README files

[Unreleased]: https://github.com/josharsh/ensureJson/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/josharsh/ensureJson/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/josharsh/ensureJson/releases/tag/v0.1.0
