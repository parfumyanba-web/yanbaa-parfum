const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'ezgif-1ef7f817f2d49674-jpg');
const dstDir = path.join(__dirname, 'public', 'frames');

// Ensure destination exists
if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
} else {
  // Clear old frames
  const oldFiles = fs.readdirSync(dstDir);
  for(const f of oldFiles) {
    fs.unlinkSync(path.join(dstDir, f));
  }
}

// Get ezgif images
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpg')).sort();

let count = 0;
files.forEach((file, idx) => {
  const srcFile = path.join(srcDir, file);
  // ezgif-frame-001.jpg -> frame_0.jpg
  const dstFile = path.join(dstDir, `frame_${idx}.jpg`);
  
  fs.copyFileSync(srcFile, dstFile);
  count++;
});

console.log(`Copied ${count} frames successfully!`);
