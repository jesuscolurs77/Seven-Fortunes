const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const animationsDir = path.resolve(__dirname, '..', 'assets', 'animations');

if (!fs.existsSync(animationsDir)) {
  console.log('Created assets/animations/ directory.');
  fs.mkdirSync(animationsDir, { recursive: true });
}

const files = fs.readdirSync(animationsDir).filter(f => f.endsWith('.tgs'));

if (files.length === 0) {
  console.log('No .tgs files found in assets/animations/.');
  process.exit(0);
}

for (const file of files) {
  const tgsPath = path.join(animationsDir, file);
  const jsonPath = tgsPath.replace('.tgs', '.json');
  const buffer = fs.readFileSync(tgsPath);

  try {
    const decompressed = zlib.gunzipSync(buffer);
    const json = JSON.parse(decompressed.toString('utf-8'));
    fs.writeFileSync(jsonPath, JSON.stringify(json), 'utf-8');
    console.log(`Converted ${file} → ${path.basename(jsonPath)} (${(buffer.length / 1024).toFixed(1)} KB → ${(jsonPath.length / 1024).toFixed(1)} KB)`);
  } catch {
    try {
      const decompressed = zlib.inflateSync(buffer);
      const json = JSON.parse(decompressed.toString('utf-8'));
      fs.writeFileSync(jsonPath, JSON.stringify(json), 'utf-8');
      console.log(`Converted ${file} → ${path.basename(jsonPath)} (inflate)`);
    } catch (e) {
      console.error(`Failed to convert ${file}: ${e.message}`);
    }
  }
}
