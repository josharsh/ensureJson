/**
 * Schema validation with ensureJson and Zod (TypeScript).
 *
 * This example demonstrates how to validate repaired JSON against schemas.
 *
 * Requirements:
 *   npm install ensure-json zod tsx
 *
 * Usage:
 *   npx tsx schema_validation.ts
 */

import { ensureJson, JsonFixError } from 'ensure-json';
import { z, ZodError } from 'zod';


// Define schemas using Zod
const ContactInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
});

const UserSchema = z.object({
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150),
  occupation: z.string(),
  hobbies: z.array(z.string()).default([]),
  contact: ContactInfoSchema.optional(),
});

const ProductSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  price: z.number().positive(),
  in_stock: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
});

type User = z.infer<typeof UserSchema>;
type Product = z.infer<typeof ProductSchema>;


function example1ValidSchema(): void {
  console.log("=".repeat(60));
  console.log("Example 1: Valid Schema");
  console.log("=".repeat(60));

  // LLM output with syntax issues but valid data
  const llmOutput = `
\`\`\`json
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
\`\`\`
  `;

  try {
    // Repair JSON and validate against schema
    const user = ensureJson(llmOutput, UserSchema) as User;
    console.log("✅ User data validated successfully!");
    console.log(`   Name: ${user.name}`);
    console.log(`   Age: ${user.age}`);
    console.log(`   Occupation: ${user.occupation}`);
    console.log(`   Contact: ${user.contact?.email ?? 'None'}`);
  } catch (err) {
    if (err instanceof JsonFixError) {
      console.log(`❌ JSON parsing failed: ${err.message}`);
    } else if (err instanceof ZodError) {
      console.log(`❌ Schema validation failed: ${err.message}`);
    }
  }

  console.log();
}


function example2TypeCoercion(): void {
  console.log("=".repeat(60));
  console.log("Example 2: Type Coercion");
  console.log("=".repeat(60));

  // LLM returned age as string instead of number
  const llmOutput = '{name: "Bob", age: "25", occupation: "Designer"}';

  // Zod can coerce string to number with the right schema
  const CoercedUserSchema = UserSchema.extend({
    age: z.coerce.number().int().min(0).max(150),
  });

  try {
    const user = ensureJson(llmOutput, CoercedUserSchema) as User;
    console.log("✅ User created with type coercion:");
    console.log(`   Age: ${user.age} (type: ${typeof user.age})`);
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(`❌ Validation failed: ${err.message}`);
    }
  }

  console.log();
}


function example3MissingOptionalFields(): void {
  console.log("=".repeat(60));
  console.log("Example 3: Missing Optional Fields");
  console.log("=".repeat(60));

  // Minimal user data (contact is optional)
  const llmOutput = '{name: "Charlie", age: 35, occupation: "Teacher"}';

  try {
    const user = ensureJson(llmOutput, UserSchema) as User;
    console.log("✅ User created with minimal data:");
    console.log(`   Name: ${user.name}`);
    console.log(`   Hobbies: ${JSON.stringify(user.hobbies)}`);  // Empty array (default)
    console.log(`   Contact: ${user.contact ?? 'None'}`);  // undefined (optional)
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(`❌ Validation failed: ${err.message}`);
    }
  }

  console.log();
}


function example4ValidationError(): void {
  console.log("=".repeat(60));
  console.log("Example 4: Validation Error");
  console.log("=".repeat(60));

  // Invalid data: age is negative
  const llmOutput = '{name: "Invalid User", age: -5, occupation: "None"}';

  try {
    const user = ensureJson(llmOutput, UserSchema) as User;
    console.log(`User created: ${JSON.stringify(user)}`);
  } catch (err) {
    if (err instanceof JsonFixError) {
      console.log(`❌ JSON parsing failed: ${err.message}`);
    } else if (err instanceof ZodError) {
      console.log("❌ Schema validation failed:");
      err.errors.forEach(error => {
        const field = error.path.join('.');
        console.log(`   - ${field}: ${error.message}`);
      });
    }
  }

  console.log();
}


function example5ProductSchema(): void {
  console.log("=".repeat(60));
  console.log("Example 5: Product Schema");
  console.log("=".repeat(60));

  const llmOutput = `
Here's the product data:

\`\`\`json
{
  id: 12345,
  name: 'Awesome Widget',
  price: 29.99,
  in_stock: true,
  tags: ["electronics", "gadgets", "bestseller",]
}
\`\`\`
  `;

  try {
    const product = ensureJson(llmOutput, ProductSchema) as Product;
    console.log("✅ Product validated successfully!");
    console.log(`   ID: ${product.id}`);
    console.log(`   Name: ${product.name}`);
    console.log(`   Price: $${product.price}`);
    console.log(`   In Stock: ${product.in_stock}`);
    console.log(`   Tags: ${product.tags.join(', ')}`);
  } catch (err) {
    if (err instanceof JsonFixError || err instanceof ZodError) {
      console.log(`❌ Error: ${err}`);
    }
  }

  console.log();
}


function example6NestedValidation(): void {
  console.log("=".repeat(60));
  console.log("Example 6: Nested Validation");
  console.log("=".repeat(60));

  // Valid nested structure
  const llmOutput = `
{
  name: "Diana Prince",
  age: 28,
  occupation: "Hero",
  contact: {
    email: "diana@example.com",
    phone: "+1-555-9999"
  }
}
  `;

  try {
    const user = ensureJson(llmOutput, UserSchema) as User;
    console.log("✅ User with nested contact validated!");
    console.log(`   Email: ${user.contact?.email}`);
    console.log(`   Phone: ${user.contact?.phone}`);
  } catch (err) {
    if (err instanceof JsonFixError || err instanceof ZodError) {
      console.log(`❌ Error: ${err}`);
    }
  }

  console.log();
}


function example7InvalidEmail(): void {
  console.log("=".repeat(60));
  console.log("Example 7: Invalid Email");
  console.log("=".repeat(60));

  // Invalid email format
  const llmOutput = `
{
  name: "Eve",
  age: 30,
  occupation: "Developer",
  contact: {
    email: "not-an-email",
    phone: "555-0000"
  }
}
  `;

  try {
    const user = ensureJson(llmOutput, UserSchema) as User;
    console.log(`User created: ${JSON.stringify(user)}`);
  } catch (err) {
    if (err instanceof ZodError) {
      console.log("❌ Validation failed:");
      err.errors.forEach(error => {
        const field = error.path.join('.');
        console.log(`   - ${field}: ${error.message}`);
      });
    }
  }

  console.log();
}


function main(): void {
  console.log("\n🔧 ensureJson + Zod Schema Validation (TypeScript)\n");

  example1ValidSchema();
  example2TypeCoercion();
  example3MissingOptionalFields();
  example4ValidationError();
  example5ProductSchema();
  example6NestedValidation();
  example7InvalidEmail();

  console.log("✅ All examples completed!");
}


main();
