import fs from 'fs';
import path from 'path';

function createLosslessWebP() {
  const hexString = 
    '52494646' + // "RIFF"
    '3c000000' + // 60 bytes length
    '57454250' + // "WEBP"
    '5650384c' + // "VP8L"
    '2f000000' + // 47 bytes VP8L chunk payload length
    '2f000000' + // 0x2f signature
    '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    
  return Buffer.from(hexString, 'hex');
}

const courseraAssets = [
  'public/images/coursera/hero-student.webp',
  'public/images/coursera/course-backend.webp',
  'public/images/coursera/course-frontend.webp',
  'public/images/coursera/certificate-gold.webp',
  'public/images/coursera/coursera-badge.webp'
];

courseraAssets.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buf = createLosslessWebP();
  fs.writeFileSync(fullPath, buf);
  console.log(`Generated Coursera WebP Asset: ${filePath}`);
});

console.log('All Coursera WebP image assets generated successfully.');
