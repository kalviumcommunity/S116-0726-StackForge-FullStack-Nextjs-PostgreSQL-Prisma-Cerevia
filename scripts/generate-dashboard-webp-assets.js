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

const dashboardAssets = [
  'public/images/dashboard/welcome.webp',
  'public/images/dashboard/progress.webp',
  'public/images/dashboard/courses.webp',
  'public/images/dashboard/mentor.webp',
  'public/images/dashboard/calendar.webp',
  'public/images/dashboard/leaderboard.webp',
  'public/images/dashboard/achievements.webp'
];

dashboardAssets.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buf = createLosslessWebP();
  fs.writeFileSync(fullPath, buf);
  console.log(`Generated Dashboard WebP Asset: ${filePath}`);
});

console.log('All Dashboard WebP image assets generated successfully.');
