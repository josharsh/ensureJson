"""
Basic ensureJson usage examples.

This example demonstrates the core functionality of ensureJson.
"""

from ensure_json import ensure_json, JsonFixError


def example_1_markdown_fences():
    """Remove markdown code fences."""
    print("=" * 60)
    print("Example 1: Markdown Fences")
    print("=" * 60)

    llm_output = '''
Here's your data:
```json
{
  "name": "Alice",
  "age": 30
}
```
    '''

    result = ensure_json(llm_output)
    print(f"Input: {llm_output[:50]}...")
    print(f"Output: {result}")
    print()


def example_2_trailing_commas():
    """Fix trailing commas."""
    print("=" * 60)
    print("Example 2: Trailing Commas")
    print("=" * 60)

    broken = '{"name": "Bob", "hobbies": ["reading", "coding",],}'

    result = ensure_json(broken)
    print(f"Input: {broken}")
    print(f"Output: {result}")
    print()


def example_3_unquoted_keys():
    """Quote bare keys."""
    print("=" * 60)
    print("Example 3: Unquoted Keys")
    print("=" * 60)

    broken = '{name: "Charlie", age: 25, city: "NYC"}'

    result = ensure_json(broken)
    print(f"Input: {broken}")
    print(f"Output: {result}")
    print()


def example_4_mixed_quotes():
    """Handle mixed quote styles."""
    print("=" * 60)
    print("Example 4: Mixed Quotes")
    print("=" * 60)

    broken = "{name: 'Diana', 'age': 28, \"city\": 'London'}"

    result = ensure_json(broken)
    print(f"Input: {broken}")
    print(f"Output: {result}")
    print()


def example_5_incomplete_json():
    """Balance missing brackets."""
    print("=" * 60)
    print("Example 5: Incomplete JSON")
    print("=" * 60)

    broken = '{"users": [{"name": "Eve"}, {"name": "Frank"'

    result = ensure_json(broken)
    print(f"Input: {broken}")
    print(f"Output: {result}")
    print()


def example_6_complex_llm_output():
    """Real-world LLM output."""
    print("=" * 60)
    print("Example 6: Complex LLM Output")
    print("=" * 60)

    llm_output = '''
I'll provide the user data in JSON format:

```json
{
  name: "Grace Hopper",
  occupation: 'Computer Scientist',
  achievements: [
    "COBOL inventor",
    "First compiler",
    "Debugging pioneer",
  ],
  born: 1906,
}
```

Hope that helps!
    '''

    result = ensure_json(llm_output)
    print(f"Input: {llm_output[:80]}...")
    print(f"Output: {result}")
    print()


def example_7_error_handling():
    """Demonstrate error handling."""
    print("=" * 60)
    print("Example 7: Error Handling")
    print("=" * 60)

    invalid_input = "This is not JSON at all!"

    try:
        result = ensure_json(invalid_input)
        print(f"Result: {result}")
    except JsonFixError as err:
        print(f"❌ Error: {err}")
        print(f"   Original input: {err.raw}")
    print()


if __name__ == "__main__":
    print("\n🔧 ensureJson - Basic Examples\n")

    example_1_markdown_fences()
    example_2_trailing_commas()
    example_3_unquoted_keys()
    example_4_mixed_quotes()
    example_5_incomplete_json()
    example_6_complex_llm_output()
    example_7_error_handling()

    print("✅ All examples completed!")
