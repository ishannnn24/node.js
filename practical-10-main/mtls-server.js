// mtls-server.js (debug version)
const fs = require('fs');
const https = require('https');
const path = require('path');

console.log('🟡 Starting mTLS server...');

// Helper function to load certs
function loadCerts() {
  const base = path.join(__dirname, 'certs');
  console.log('📂 Looking for certs in:', base);

  const files = ['server.key', 'server.crt', 'ca.crt'];
  for (const f of files) {
    const p = path.join(base, f);
    if (!fs.existsSync(p)) {
      throw new Error(`❌ Missing file: ${p}`);
    }
  }

  return {
    key: fs.readFileSync(path.join(base, 'server.key')),
    cert: fs.readFileSync(path.join(base, 'server.crt')),
    ca: fs.readFileSync(path.join(base, 'ca.crt')),
    requestCert: true,
    rejectUnauthorized: true
  };
}

let options;
try {
  options = loadCerts();
  console.log('✅ Certificates loaded successfully.');
} catch (err) {
  console.error('⚠️ Error loading certs:', err.message);
  process.exit(1);
}
