# Middleware Pipeline Architecture (Node.js + Express)

### 🎯 Goal
Build a robust middleware stack in Express demonstrating proper middleware order, request correlation, timing, validation, and centralized error handling.

---

 Features Implemented
 *X-Request-Id Correlation*  
Generates a unique X-Request-Id for every request (or uses client-provided one) to trace logs and responses.

 *High-Precision Timing*  
Measures time taken to process each request and returns it in the header X-Response-Time-ms.

 *Body Size Limit & JSON Parse Safety*  
Uses Express JSON parser with body size limit (10kb) and safely handles malformed JSON.

 *CORS (Whitelist)*  
Restricts origins to a defined whitelist (e.g., http://localhost:3000).

 *Per-Route Schema Validation*  
Validates incoming request bodies using *Ajv* JSON schema validator.

*Centralized Error Handler (RFC 7807)*  
Returns all errors in application/problem+json format with structured details.

 *Async Error Handling*  
All async errors are captured and passed to the centralized error handler — no unhandled rejections.

 *Single File Demo*  
Everything runs from one file: server.js

---

 Tech Stack
- *Node.js* (v16+)
- *Express.js*
- *CORS*
- *Ajv* (for schema validation)

