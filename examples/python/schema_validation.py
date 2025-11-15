"""
Schema validation with ensureJson and Pydantic.

This example demonstrates how to validate repaired JSON against schemas.

Requirements:
    pip install ensure-json pydantic

Usage:
    python schema_validation.py
"""

from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field, ValidationError
from ensure_json import ensure_json, JsonFixError


# Define schemas using Pydantic
class ContactInfo(BaseModel):
    """Contact information schema."""
    email: EmailStr
    phone: Optional[str] = None


class User(BaseModel):
    """User profile schema."""
    name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., ge=0, le=150)
    occupation: str
    hobbies: List[str] = []
    contact: Optional[ContactInfo] = None


class Product(BaseModel):
    """Product schema."""
    id: int
    name: str
    price: float = Field(..., gt=0)
    in_stock: bool = True
    tags: List[str] = []


def example_1_valid_schema():
    """Example with valid data that matches schema."""
    print("=" * 60)
    print("Example 1: Valid Schema")
    print("=" * 60)

    # LLM output with syntax issues but valid data
    llm_output = '''
```json
{
  name: "Alice Smith",
  age: 30,
  occupation: "Software Engineer",
  hobbies: ["coding", "reading", "hiking",],
  contact: {
    email: "alice@example.com",
    phone: "+1-555-0123",
  }
}
```
    '''

    try:
        # Repair JSON and validate against schema
        user = ensure_json(llm_output, schema=User)
        print("✅ User data validated successfully!")
        print(f"   Name: {user.name}")
        print(f"   Age: {user.age}")
        print(f"   Occupation: {user.occupation}")
        print(f"   Contact: {user.contact.email if user.contact else 'None'}")
    except JsonFixError as err:
        print(f"❌ JSON parsing failed: {err}")
    except ValidationError as err:
        print(f"❌ Schema validation failed: {err}")

    print()


def example_2_type_coercion():
    """Example with type coercion."""
    print("=" * 60)
    print("Example 2: Type Coercion")
    print("=" * 60)

    # LLM returned age as string instead of int
    llm_output = '{name: "Bob", age: "25", occupation: "Designer"}'

    # Pydantic will try to coerce the string "25" to int
    try:
        user = ensure_json(llm_output, schema=User)
        print("✅ User created with type coercion:")
        print(f"   Age: {user.age} (type: {type(user.age).__name__})")
    except ValidationError as err:
        print(f"❌ Validation failed: {err}")

    print()


def example_3_missing_optional_fields():
    """Example with missing optional fields."""
    print("=" * 60)
    print("Example 3: Missing Optional Fields")
    print("=" * 60)

    # Minimal user data (contact is optional)
    llm_output = '{name: "Charlie", age: 35, occupation: "Teacher"}'

    try:
        user = ensure_json(llm_output, schema=User)
        print("✅ User created with minimal data:")
        print(f"   Name: {user.name}")
        print(f"   Hobbies: {user.hobbies}")  # Empty list (default)
        print(f"   Contact: {user.contact}")  # None (optional)
    except ValidationError as err:
        print(f"❌ Validation failed: {err}")

    print()


def example_4_validation_error():
    """Example that fails validation."""
    print("=" * 60)
    print("Example 4: Validation Error")
    print("=" * 60)

    # Invalid data: age is negative
    llm_output = '{name: "Invalid User", age: -5, occupation: "None"}'

    try:
        user = ensure_json(llm_output, schema=User)
        print(f"User created: {user}")
    except JsonFixError as err:
        print(f"❌ JSON parsing failed: {err}")
    except ValidationError as err:
        print("❌ Schema validation failed:")
        for error in err.errors():
            field = ".".join(str(loc) for loc in error['loc'])
            print(f"   - {field}: {error['msg']}")

    print()


def example_5_product_schema():
    """Example with product data."""
    print("=" * 60)
    print("Example 5: Product Schema")
    print("=" * 60)

    llm_output = '''
Here's the product data:

```json
{
  id: 12345,
  name: 'Awesome Widget',
  price: 29.99,
  in_stock: true,
  tags: ["electronics", "gadgets", "bestseller",]
}
```
    '''

    try:
        product = ensure_json(llm_output, schema=Product)
        print("✅ Product validated successfully!")
        print(f"   ID: {product.id}")
        print(f"   Name: {product.name}")
        print(f"   Price: ${product.price}")
        print(f"   In Stock: {product.in_stock}")
        print(f"   Tags: {', '.join(product.tags)}")
    except (JsonFixError, ValidationError) as err:
        print(f"❌ Error: {err}")

    print()


def example_6_nested_validation():
    """Example with nested object validation."""
    print("=" * 60)
    print("Example 6: Nested Validation")
    print("=" * 60)

    # Valid nested structure
    llm_output = '''
{
  name: "Diana Prince",
  age: 28,
  occupation: "Hero",
  contact: {
    email: "diana@example.com",
    phone: "+1-555-9999"
  }
}
    '''

    try:
        user = ensure_json(llm_output, schema=User)
        print("✅ User with nested contact validated!")
        print(f"   Email: {user.contact.email}")
        print(f"   Phone: {user.contact.phone}")
    except (JsonFixError, ValidationError) as err:
        print(f"❌ Error: {err}")

    print()


def example_7_invalid_email():
    """Example with invalid email in nested object."""
    print("=" * 60)
    print("Example 7: Invalid Email")
    print("=" * 60)

    # Invalid email format
    llm_output = '''
{
  name: "Eve",
  age: 30,
  occupation: "Developer",
  contact: {
    email: "not-an-email",
    phone: "555-0000"
  }
}
    '''

    try:
        user = ensure_json(llm_output, schema=User)
        print(f"User created: {user}")
    except ValidationError as err:
        print("❌ Validation failed:")
        for error in err.errors():
            field = ".".join(str(loc) for loc in error['loc'])
            print(f"   - {field}: {error['msg']}")

    print()


if __name__ == "__main__":
    print("\n🔧 ensureJson + Pydantic Schema Validation\n")

    example_1_valid_schema()
    example_2_type_coercion()
    example_3_missing_optional_fields()
    example_4_validation_error()
    example_5_product_schema()
    example_6_nested_validation()
    example_7_invalid_email()

    print("✅ All examples completed!")
