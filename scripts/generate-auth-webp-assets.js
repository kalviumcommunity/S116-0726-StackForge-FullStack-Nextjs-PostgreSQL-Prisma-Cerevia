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

const authAssets = [
  'public/images/auth/login.webp',
  'public/images/auth/register.webp',
  'public/images/auth/forgot-password.webp',
  'public/images/auth/reset-password.webp',
  'public/images/auth/verify-email.webp',
  'public/images/auth/students.webp',
  'public/images/auth/coding.webp',
  'public/images/auth/ai-learning.webp'
];

authAssets.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buf = createLosslessWebP();
  fs.writeFileSync(fullPath, buf);
  console.log(`Generated Auth WebP: ${filePath}`);
});

console.log('All Authentication WebP image assets generated successfully.');
