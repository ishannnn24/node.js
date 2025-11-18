// src/index.js
import { dynamicImport } from './dynamicImport.js';

async function runDemo() {
  const mod = await dynamicImport('./example.mjs');
  console.log('Module loaded:', mod);

  const jsonData = await dynamicImport('./data.json');
  console.log('JSON loaded:', jsonData);
}

runDemo();
