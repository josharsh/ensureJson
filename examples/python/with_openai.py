"""
Using ensureJson with OpenAI GPT models.

This example shows how to parse structured JSON outputs from GPT,
even when the model returns imperfect JSON.

Requirements:
    pip install openai ensure-json

Usage:
    export OPENAI_API_KEY=your_api_key_here
    python with_openai.py
"""

import os
from openai import OpenAI
from ensure_json import ensure_json, JsonFixError


def get_user_profile(name: str) -> dict:
    """
    Ask GPT to generate a user profile and parse the JSON response.

    Args:
        name: User name to generate profile for

    Returns:
        Parsed user profile as a dictionary
    """
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    # Ask GPT to return JSON (it might not be perfect!)
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that returns user profiles in JSON format."
            },
            {
                "role": "user",
                "content": f"""Generate a fictional user profile for {name}.
                Return ONLY valid JSON with these fields:
                - name (string)
                - age (number)
                - occupation (string)
                - hobbies (array of strings)
                - contact (object with email and phone)
                """
            }
        ],
        temperature=0.7,
    )

    # Extract the response
    llm_output = response.choices[0].message.content

    print("🤖 GPT Response:")
    print(llm_output)
    print()

    # Parse with ensureJson (handles imperfect JSON!)
    try:
        profile = ensure_json(llm_output)
        print("✅ Parsed profile:")
        print(profile)
        return profile
    except JsonFixError as err:
        print(f"❌ Could not parse JSON: {err}")
        print(f"   Raw output: {err.raw}")
        raise


def get_todo_list() -> list:
    """
    Ask GPT to generate a todo list in JSON format.

    Returns:
        List of todo items
    """
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": """Create a JSON array of 5 todo items for a software developer.
                Each item should have: id (number), task (string), priority (low/medium/high), completed (boolean)
                """
            }
        ],
    )

    llm_output = response.choices[0].message.content

    print("🤖 GPT Response:")
    print(llm_output)
    print()

    # Parse the response
    todos = ensure_json(llm_output)
    print("✅ Parsed todos:")
    for todo in todos:
        status = "✅" if todo.get("completed") else "⬜"
        print(f"  {status} [{todo.get('priority', 'N/A')}] {todo.get('task')}")

    return todos


def extract_structured_data() -> dict:
    """
    Use GPT for data extraction and parse the result.

    Returns:
        Extracted structured data
    """
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    text = """
    John Doe is a 32-year-old software engineer living in San Francisco.
    He can be reached at john.doe@email.com or (555) 123-4567.
    His interests include machine learning, rock climbing, and photography.
    """

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "user",
                "content": f"""Extract structured data from this text and return as JSON:

                {text}

                Return JSON with: name, age, occupation, location, email, phone, interests (array)
                """
            }
        ],
    )

    llm_output = response.choices[0].message.content

    print("🤖 GPT Response:")
    print(llm_output)
    print()

    # Parse the extracted data
    data = ensure_json(llm_output)
    print("✅ Extracted data:")
    print(data)

    return data


def main():
    """Run all examples."""
    print("\n" + "=" * 70)
    print("🔧 ensureJson + OpenAI Examples")
    print("=" * 70 + "\n")

    # Check API key
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ Error: OPENAI_API_KEY environment variable not set")
        print("   Set it with: export OPENAI_API_KEY=your_api_key_here")
        return

    try:
        # Example 1: User profile
        print("\n📋 Example 1: Generate User Profile\n")
        profile = get_user_profile("Alice")

        # Example 2: Todo list
        print("\n" + "=" * 70)
        print("\n📋 Example 2: Generate Todo List\n")
        todos = get_todo_list()

        # Example 3: Data extraction
        print("\n" + "=" * 70)
        print("\n📋 Example 3: Extract Structured Data\n")
        data = extract_structured_data()

        print("\n" + "=" * 70)
        print("\n✅ All examples completed successfully!")
        print("=" * 70 + "\n")

    except Exception as e:
        print(f"\n❌ Error: {e}")
        raise


if __name__ == "__main__":
    main()
