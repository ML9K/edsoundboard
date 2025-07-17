// Run this in your repo root with: node generate-sound-list.js
const fs = require('fs');
const path = require('path');

const soundsDir = path.join(__dirname, 'sounds');
const outFile = path.join(soundsDir, 'list.json');

const files = fs.readdirSync(soundsDir)
  .filter(f => f.endsWith('.mp3'))
  .map(f => ({
    name: f.replace(/_/g, ' ').replace(/\.mp3$/, '').replace(/\b\w/g, l => l.toUpperCase()),
    file: f
  }));

fs.writeFileSync(outFile, JSON.stringify(files, null, 2));
console.log(`Wrote ${files.length} entries to ${outFile}`);