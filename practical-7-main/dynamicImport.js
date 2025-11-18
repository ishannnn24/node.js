// src/dynamicImport.js
export async function dynamicImport(file) {
  try {
    const ext = file.split('.').pop();
    let module;

    if (ext === 'json') {
      module = await import(file, { assert: { type: 'json' } });
    } else if (ext === 'js' || ext === 'mjs') {
      module = await import(file);
    } else {
      throw new Error(`Unsupported file type: ${ext}`);
    }

    return module.default || module;
  } catch (err) {
    console.error(`Failed to dynamically import ${file}:`, err);
    throw err;
  }
}
