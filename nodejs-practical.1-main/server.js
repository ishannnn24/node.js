// server.js

const http = require('http');
const fs = require('fs');
const port = 3000;

// Writing to a file
fs.writeFileSync('data.txt', 'This is a sample text written to the file.');

// Creating HTTP Server
const server = http.createServer((req, res) => {
  // Reading from a file
  const fileContent = fs.readFileSync('data.txt', 'utf8');

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`File content:\n${fileContent}`);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
