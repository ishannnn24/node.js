// Practical-2: Combined Tasks in one main.js

// ----------------------
// Task 1: Hoisting in Variables
// ----------------------
console.log("Task 1: Hoisting in Variables");

try {
    console.log(myVar); // undefined (var is hoisted and initialized with undefined)
    var myVar = "I am var";
} catch (err) {
    console.log("Error with var:", err.message);
}

try {
    console.log(myLet); // ReferenceError (temporal dead zone)
    let myLet = "I am let";
} catch (err) {
    console.log("Error with let:", err.message);
}

try {
    console.log(myConst); // ReferenceError (temporal dead zone)
    const myConst = "I am const";
} catch (err) {
    console.log("Error with const:", err.message);
}

console.log("\n");

// ----------------------
// Task 2: Function Declarations vs Expressions
// ----------------------
console.log("Task 2: Function Declarations vs Expressions");

try {
    console.log("add(2,3) before definition:", add(2, 3)); // works
} catch (err) {
    console.log("Error calling add before definition:", err.message);
}

try {
    console.log("multiply(2,3) before definition:", multiply(2, 3)); // error
} catch (err) {
    console.log("Error calling multiply before definition:", err.message);
}

// Function Declaration
function add(a, b) {
    return a + b;
}

// Function Expression
const multiply = function (a, b) {
    return a * b;
};

console.log("add(5,7) after definition:", add(5, 7)); // works
console.log("multiply(5,7) after definition:", multiply(5, 7)); // works

console.log("\n");

// ----------------------
// Task 3: Arrow Functions vs Normal Functions
// ----------------------
console.log("Task 3: Arrow Functions vs Normal Functions");

const obj = {
    name: "Ishan",
    normalFunc: function () {
        console.log("Normal Function this.name:", this.name);
        console.log("Normal Function this:", this);
    },
    arrowFunc: () => {
        console.log("Arrow Function this.name:", this?.name);
        console.log("Arrow Function this:", this);
    },
};

obj.normalFunc(); // "Ishan", object reference
obj.arrowFunc();  // undefined, lexical this

console.log("\n");

// ----------------------
// Task 4: Higher Order Functions
// ----------------------
console.log("Task 4: Higher Order Functions");

function calculate(operation, a, b) {
    return operation(a, b);
}

function addOp(x, y) {
    return x + y;
}

function subtractOp(x, y) {
    return x - y;
}

function multiplyOp(x, y) {
    return x * y;
}

function divideOp(x, y) {
    return y !== 0 ? x / y : "Cannot divide by zero";
}

console.log("Add (10, 5):", calculate(addOp, 10, 5));
console.log("Subtract (10, 5):", calculate(subtractOp, 10, 5));
console.log("Multiply (10, 5):", calculate(multiplyOp, 10, 5));
console.log("Divide (10, 5):", calculate(divideOp, 10, 5));
