import { ensureJson } from './dist/index.js';

const result = ensureJson('```json { name: "Alice", age: 42, }');
console.log(result);
