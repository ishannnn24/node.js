// server.js
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Fix ES Module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  console.log(`📥 Request for: ${req.url}`);

  // Default file
  let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
  filePath = path.normalize(filePath);

  const ext = path.extname(filePath);
  let contentType = "text/html";

  switch (ext) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "application/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Page Not Found</h1>");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
