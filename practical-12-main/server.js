// server.js
const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');
const Ajv = require('ajv');

const app = express();
const ajv = new Ajv();

// ---------- CONFIG ----------
const PORT = process.env.PORT || 4000;
const CORS_WHITELIST = ['http://localhost:3000']; // change to your allowed origins
const BODY_LIMIT = '10kb'; // body size limit

// ---------- MIDDLEWARE ----------

// CORS locked to whitelist
app.use(cors({
  origin: (origin, cb) => {
    // allow non-browser tools (curl, Postman) when origin is undefined
    if (!origin) return cb(null, true);
    if (CORS_WHITELIST.indexOf(origin) !== -1) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  }
}));

// Body parser with size limit and JSON parse safety
// express.json will throw a SyntaxError for invalid JSON; we catch it later in error handler.
app.use(express.json({ limit: BODY_LIMIT }));

// X-Request-Id middleware (correlation)
app.use((req, res, next) => {
  // preserve if client sent one, otherwise generate.
  const id = req.header('X-Request-Id') || randomUUID();
  req.requestId = id;
  res.setHeader('X-Request-Id', id);
  next();
});

// High-precision timing middleware (ms)
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  // when response finishes, set header
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const diffNs = end - start;
    const diffMs = Number(diffNs) / 1_000_000; // convert ns -> ms
    // round to 3 decimals
    res.setHeader('X-Response-Time-ms', diffMs.toFixed(3));
  });
  next();
});

// Helper to wrap async route handlers so errors go to central error handler
const wrap = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Simple logger middleware to show order (optional)
app.use((req, res, next) => {
  // attach order array so endpoint can demonstrate order of execution
  req._order = (req._order || []).concat('middleware-logger');
  next();
});

// ---------- ROUTE: Demonstrate ordering & validation ----------

// Example schema for POST /demo
const demoSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    age: { type: 'integer', minimum: 0 }
  },
  required: ['name'],
  additionalProperties: false
};
const validateDemo = ajv.compile(demoSchema);

app.post('/demo', wrap(async (req, res) => {
  // record middleware order for demonstration
  req._order = req._order.concat('route-handler');

  // validate body per-route
  const valid = validateDemo(req.body || {});
  if (!valid) {
    const err = new Error('Validation failed');
    err.status = 400;
    err.validation = validateDemo.errors;
    throw err; // go to centralized error handler
  }

  // emulate async operation
  await new Promise(r => setTimeout(r, 30));

  // respond with ordering info
  res.json({
    message: 'OK - ordering works',
    order: req._order,
    requestId: req.requestId
  });
}));

// Simple GET endpoint to prove basic ordering
app.get('/ping', (req, res) => {
  req._order = (req._order || []).concat('ping-handler');
  res.json({ pong: true, order: req._order, requestId: req.requestId });
});

// ---------- CENTRALIZED ERROR HANDLER (RFC-7807 problem+json) ----------
app.use((err, req, res, next) => {
  // Ensure async rejections and other errors are handled
  // default status
  const status = err.status || err.statusCode || 500;

  // If JSON parse error from body parser, treat as 400
  if (err instanceof SyntaxError && err.type === 'entity.parse.failed') {
    // body parser JSON parse error
    err.title = 'Invalid JSON';
    err.detail = err.message;
  }

  // Build problem+json object
  const problem = {
    type: err.type || 'about:blank',
    title: err.title || (status === 500 ? 'Internal Server Error' : err.message),
    status: status,
    detail: err.detail || err.message,
    instance: req.originalUrl
  };

  // attach validation details when present (compact)
  if (err.validation) {
    problem.validationErrors = err.validation;
  }

  res.setHeader('Content-Type', 'application/problem+json');
  res.setHeader('X-Request-Id', req.requestId || 'unknown');
  // response-time header might be set on 'finish', but if error ends response early it's ok
  res.status(status).json(problem);
});

// Catch unhandled promise rejections at process level and log (avoid crash)
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection (should be avoided):', reason);
  // do not crash — but in production you might want to exit and restart
});

// ---------- START ----------
app.listen(PORT, () => {
  console.log(`Demo middleware server listening on http://localhost:${PORT}`);
});