
const fs = require("fs");

// ----------------------
// Part 1: Modules
// ----------------------
console.log("Practical-3 : Part 1 (Modules)");

// Instead of separate math.js, we define here
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }

console.log("Add(15, 5):", add(15, 5));
console.log("Subtract(15, 5):", subtract(15, 5));

console.log("\n");

// ----------------------
// Part 2: File System (Blocking vs Non-Blocking)
// ----------------------
console.log("Practical-3 : Part 2 (File System)");

const filePath = "./sample.txt";

// Create a sample file for demonstration
fs.writeFileSync(filePath, "Hello, this is sample content!");

// Blocking read
const dataBlocking = fs.readFileSync(filePath, "utf8");
console.log("Blocking Read:", dataBlocking);

// Non-blocking read
fs.readFile(filePath, "utf8", (err, dataNonBlocking) => {
    if (err) throw err;
    console.log("Non-blocking Read:", dataNonBlocking);
});

console.log("\n");

// ----------------------
// Part 3: Asynchronous Programming
// ----------------------
console.log("Practical-3 : Part 3 (Asynchronous Programming)");

function fetchUserData() {
    console.log("Fetching data...");
    setTimeout(() => {
        console.log("Data received (after 5 sec)");
    }, 5000);
}

fetchUserData();
