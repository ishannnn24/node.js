// Simple To-Do API using Node.js + Express

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// In-memory todo storage
let todos = [];

// POST /todos → add a todo
app.post("/todos", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }
    const newTodo = { id: todos.length + 1, task };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// GET /todos → list todos
app.get("/todos", (req, res) => {
    res.json(todos);
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ To-Do API running at http://localhost:${PORT}`);
});
