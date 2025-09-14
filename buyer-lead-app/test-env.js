// test-env.js
require('dotenv').config();

console.log("--- Testing Environment Variables ---");
console.log("Is DATABASE_URL loaded?", process.env.DATABASE_URL);
console.log("-----------------------------------");