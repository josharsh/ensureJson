/**
 * Basic ensureJson usage examples (JavaScript).
 *
 * This example demonstrates the core functionality of ensureJson.
 *
 * Usage:
 *   npm install ensure-json  # or pnpm add ensure-json
 *   node basic.js
 */

const { ensureJson, JsonFixError } = require('ensure-json');


function example1MarkdownFences() {
  console.log("=".repeat(60));
  console.log("Example 1: Markdown Fences");
  console.log("=".repeat(60));

  const llmOutput = `
Here's your data:
\`\`\`json
{
  "name": "Alice",
  "age": 30
}
\`\`\`
  `;

  const result = ensureJson(llmOutput);
  console.log(`Input: ${llmOutput.substring(0, 50)}...`);
  console.log(`Output:`, result);
  console.log();
}


function example2TrailingCommas() {
  console.log("=".repeat(60));
  console.log("Example 2: Trailing Commas");
  console.log("=".repeat(60));

  const broken = '{"name": "Bob", "hobbies": ["reading", "coding",],}';

  const result = ensureJson(broken);
  console.log(`Input: ${broken}`);
  console.log(`Output:`, result);
  console.log();
}


function example3UnquotedKeys() {
  console.log("=".repeat(60));
  console.log("Example 3: Unquoted Keys");
  console.log("=".repeat(60));

  const broken = '{name: "Charlie", age: 25, city: "NYC"}';

  const result = ensureJson(broken);
  console.log(`Input: ${broken}`);
  console.log(`Output:`, result);
  console.log();
}


function example4MixedQuotes() {
  console.log("=".repeat(60));
  console.log("Example 4: Mixed Quotes");
  console.log("=".repeat(60));

  const broken = "{name: 'Diana', 'age': 28, \"city\": 'London'}";

  const result = ensureJson(broken);
  console.log(`Input: ${broken}`);
  console.log(`Output:`, result);
  console.log();
}


function example5IncompleteJson() {
  console.log("=".repeat(60));
  console.log("Example 5: Incomplete JSON");
  console.log("=".repeat(60));

  const broken = '{"users": [{"name": "Eve"}, {"name": "Frank"';

  const result = ensureJson(broken);
  console.log(`Input: ${broken}`);
  console.log(`Output:`, result);
  console.log();
}


function example6ComplexLlmOutput() {
  console.log("=".repeat(60));
  console.log("Example 6: Complex LLM Output");
  console.log("=".repeat(60));

  const llmOutput = `
I'll provide the user data in JSON format:

\`\`\`json
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
\`\`\`

Hope that helps!
  `;

  const result = ensureJson(llmOutput);
  console.log(`Input: ${llmOutput.substring(0, 80)}...`);
  console.log(`Output:`, result);
  console.log();
}


function example7ErrorHandling() {
  console.log("=".repeat(60));
  console.log("Example 7: Error Handling");
  console.log("=".repeat(60));

  const invalidInput = "This is not JSON at all!";

  try {
    const result = ensureJson(invalidInput);
    console.log(`Result:`, result);
  } catch (err) {
    if (err instanceof JsonFixError) {
      console.log(`❌ Error: ${err.message}`);
      console.log(`   Original input: ${err.raw}`);
    }
  }
  console.log();
}


function main() {
  console.log("\n🔧 ensureJson - Basic Examples (JavaScript)\n");

  example1MarkdownFences();
  example2TrailingCommas();
  example3UnquotedKeys();
  example4MixedQuotes();
  example5IncompleteJson();
  example6ComplexLlmOutput();
  example7ErrorHandling();

  console.log("✅ All examples completed!");
}


main();
