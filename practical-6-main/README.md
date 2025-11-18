# practical-6

---

## 🚀 Task 1: Server with Dynamic Imports

### Description
Creates a basic HTTP server using **top-level await** and **dynamic imports** to load modules only when needed.

### Features
- Top-level `await` for asynchronous module loading
- Dynamic import of route handlers or utilities
- Minimal footprint and fast startup

### Run
```bash
node server/index.js
Task 2: Stream-Based Domain Counter
Description
Processes a large CSV file () containing ~1M user records. Extracts email domains and counts occurrences using streaming, readline, and pipeline to avoid loading the entire file into memory.
Features
• 	Efficient memory usage with backpressure handling
• 	Uses Node.js , , and 
• 	Outputs domain counts to 
Run
node stream/domainCounter.js
 Task 3: EventEmitter-Based Logger
Description
Implements a custom logger using Node.js . Supports multiple transports (console, file) and size-based log rotation (~50KB per file).
Features
• 	Emits log events with structured messages
• 	Console and file transports subscribe to events
• 	File transport rotates logs when size exceeds 50KB
Run
node logger/logger.js
