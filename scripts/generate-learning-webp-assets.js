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

const learningAssets = [
  'public/images/courses/nextjs.webp',
  'public/images/courses/typescript.webp',
  'public/images/courses/ai-agents.webp',
  'public/images/courses/system-design.webp',
  'public/images/courses/database.webp',
  'public/images/lessons/html.webp',
  'public/images/lessons/css.webp',
  'public/images/lessons/js.webp',
  'public/images/instructors/sarah.webp',
  'public/images/instructors/alex.webp',
  'public/images/resources/cheatsheet.webp',
  'public/images/resources/slides.webp',
];

learningAssets.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buf = createLosslessWebP();
  fs.writeFileSync(fullPath, buf);
  console.log(`Generated Learning WebP Asset: ${filePath}`);
});

console.log('All Learning WebP image assets generated successfully.');
