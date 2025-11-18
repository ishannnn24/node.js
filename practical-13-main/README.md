 Streaming & Content Negotiation Middleware (Express.js)

This project demonstrates two advanced Express.js middleware tasks:

1. Streaming & Backpressure + Client Abort-Aware Middleware
2. Content Negotiation Middleware (JSON vs XML)



  Features

 Task 1: Streaming & Backpressure + Client Abort-Aware Middleware
- Implements a **streaming endpoint** (`/stream`) that produces **NDJSON** (newline-delimited JSON).
- Handles **backpressure** using the Node.js stream `drain` event.
- Detects **client disconnects** and stops producing data immediately.
- Simulates a continuous stream of generated JSON objects.

Task 2: Content Negotiation Middleware (JSON vs XML)
- Provides a reusable middleware function that checks the **Accept** header.
- Automatically returns data as **JSON** or **XML**.
- Uses the `js2xmlparser` library for JSON → XML conversion.
- Example endpoint: `/data`

---



