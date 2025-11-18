// server.js
const express = require('express');
const js2xmlparser = require('js2xmlparser');

const app = express();
const PORT = process.env.PORT || 3000;

/* ---------- Helper: sleep ---------- */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/* ---------- Task 2: Reusable negotiate middleware ----------
   Usage: app.use('/data', negotiate({ default: 'json', xmlRoot: 'items' }), handler)
   It attaches res.respond(obj) which sends JSON or XML based on Accept header.
*/
function negotiate({ defaultType = 'json', xmlRoot = 'root' } = {}) {
  return (req, res, next) => {
    // parse Accept header simply: prefer xml if includes 'xml', otherwise json
    const accept = (req.headers.accept || '').toLowerCase();
    let chosen = defaultType; // 'json' or 'xml'
    if (accept.includes('application/xml') || accept.includes('text/xml') || accept.includes('+xml')) {
      chosen = 'xml';
    } else if (accept.includes('application/json') || accept.includes('*/*') || accept === '') {
      chosen = 'json';
    }

    // attach helper
    res.respond = (obj) => {
      if (chosen === 'xml') {
        // convert JS object to XML string
        const xml = js2xmlparser.parse(xmlRoot, obj);
        res.type('application/xml').send(xml);
      } else {
        res.type('application/json').send(JSON.stringify(obj));
      }
    };

    // also expose chosen type if needed
    res.locals.negotiatedType = chosen;
    next();
  };
}

/* ---------- Task 1: Streaming NDJSON with backpressure & client-abort aware ----------
   Endpoint: GET /stream
   - Produces NDJSON (one JSON object per line)
   - Honors backpressure (waits for 'drain' when res.write returns false)
   - Stops producing when client disconnects (req 'close')
*/
async function* sampleProducer() {
  // Example: produce infinite sequence or until stopped
  let i = 1;
  while (true) {
    yield { id: i, text: `item ${i}`, timestamp: new Date().toISOString() };
    i++;
    // simulate production speed (tweak as required)
    await sleep(200);
  }
}

// helper to await 'drain' on res
function waitForDrain(res) {
  return new Promise(resolve => {
    res.once('drain', resolve);
  });
}

app.get('/stream', async (req, res) => {
  // Response headers for NDJSON and chunked transfer
  res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');

  // Ensure Node doesn't auto-close socket early
  // (Express/res normally fine; this is explicit)
  const producer = sampleProducer();
  let aborted = false;

  // If client disconnects, 'close' event fires on req
  req.on('close', () => {
    aborted = true;
    // If the producer is an async generator, we can attempt to return it.
    if (typeof producer.return === 'function') {
      try { producer.return(); } catch (e) { /* ignore */ }
    }
  });

  try {
    for await (const obj of producer) {
      if (aborted) break;

      const chunk = JSON.stringify(obj) + '\n';

      // Write and respect backpressure
      const ok = res.write(chunk);
      if (!ok) {
        // stream buffer full — wait for 'drain' before producing more
        await waitForDrain(res);
      }

      // optional safety: if client disconnected while waiting, break
      if (aborted) break;
    }
  } catch (err) {
    // handle errors (producer threw)
    console.error('Stream error:', err);
  } finally {
    // end response if not already ended and client still there
    try { res.end(); } catch (e) { /* ignore */ }
  }
});

/* ---------- Example non-streaming endpoint using negotiation middleware ---------- */
app.get('/data', negotiate({ defaultType: 'json', xmlRoot: 'items' }), (req, res) => {
  const data = {
    message: 'Here is some data',
    items: [
      { id: 1, name: 'Alpha' },
      { id: 2, name: 'Beta' },
    ],
    generatedAt: new Date().toISOString()
  };

  res.respond(data); // sends JSON or XML depending on Accept
});

/* ---------- Small route to show what was negotiated ---------- */
app.get('/data/info', negotiate({ defaultType: 'json' }), (req, res) => {
  res.send({ negotiated: res.locals.negotiatedType });
});

/* ---------- Start server ---------- */
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`Stream endpoint: http://localhost:${PORT}/stream`);
  console.log(`Negotiated data endpoint: http://localhost:${PORT}/data`);
});
