
// src/scanDependencies.js
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { globSync } from "glob";

/**
 * Compute SHA-256 hash of all files in a package directory.
 */
function computeHash(dir) {
  const hash = crypto.createHash("sha256");

  const walk = (current) => {
    const items = fs.readdirSync(current, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(current, item.name);
      if (item.isDirectory()) {
        walk(fullPath);
      } else {
        const data = fs.readFileSync(fullPath);
        hash.update(data);
      }
    }
  };

  walk(dir);
  return hash.digest("hex");
}

/**
 * Recursively builds dependency graph.
 */
function buildDependencyGraph(pkgName, allPackages, visited = new Set()) {
  if (visited.has(pkgName)) return {};
  visited.add(pkgName);

  const pkg = allPackages[pkgName];
  if (!pkg) return {};

  const deps = pkg.dependencies || {};
  const graph = {};

  for (const dep of Object.keys(deps)) {
    graph[dep] = buildDependencyGraph(dep, allPackages, visited);
  }

  return graph;
}

/**
 * Main function — scans node_modules and collects info.
 */
function scanNodeModules(rootDir = "./node_modules") {
  console.log("🔍 Scanning node_modules...");

  const packagePaths = globSync(`${rootDir}/*/package.json`, { absolute: true });
  const allPackages = {};

  for (const pkgPath of packagePaths) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      const pkgDir = path.dirname(pkgPath);

      const licenseFileExists = fs.existsSync(path.join(pkgDir, "LICENSE")) ||
                                fs.existsSync(path.join(pkgDir, "LICENSE.md")) ||
                                fs.existsSync(path.join(pkgDir, "LICENSE.txt"));

      const license = pkg.license || (licenseFileExists ? "LICENSE file found" : "UNKNOWN");
      const hash = computeHash(pkgDir);

      allPackages[pkg.name] = {
        version: pkg.version,
        dependencies: pkg.dependencies || {},
        license,
        hash,
      };
    } catch (err) {
      console.warn(`⚠️ Could not read: ${pkgPath} — ${err.message}`);
    }
  }

  // Build dependency graph from top-level packages
  const graph = {};
  for (const pkg of Object.keys(allPackages)) {
    graph[pkg] = buildDependencyGraph(pkg, allPackages);
  }

  // Report packages with missing license
  const missingLicense = Object.entries(allPackages)
    .filter(([_, data]) => data.license === "UNKNOWN")
    .map(([name]) => name);

  // Save reports
  fs.writeFileSync("dependencyGraph.json", JSON.stringify(graph, null, 2));
  fs.writeFileSync("packageHashes.json", JSON.stringify(allPackages, null, 2));
  fs.writeFileSync("missingLicenses.json", JSON.stringify(missingLicense, null, 2));

  console.log("✅ Scan complete!");
  console.log(`📦 Total packages: ${Object.keys(allPackages).length}`);
  console.log(`⚠️ Packages missing license: ${missingLicense.length}`);
  console.log("🧩 Reports saved: dependencyGraph.json, packageHashes.json, missingLicenses.json");
}

// Run the scanner
scanNodeModules();
