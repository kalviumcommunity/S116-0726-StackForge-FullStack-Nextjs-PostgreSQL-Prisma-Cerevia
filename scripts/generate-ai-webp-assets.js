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

const aiAssets = [
  'public/images/ai/mentor.webp',
  'public/images/ai/assistant.webp',
  'public/images/ai/chat.webp',
  'public/images/ai/study.webp',
  'public/images/ai/coding.webp',
  'public/images/ai/voice.webp',
  'public/images/ai/backgrounds/hero-gradient.webp',
  'public/images/ai/backgrounds/mesh-glow.webp',
  'public/images/ai/illustrations/ai-avatar.webp',
  'public/images/ai/illustrations/empty-chat.webp',
  'public/images/ai/illustrations/mind-map.webp',
  'public/images/ai/illustrations/study-plan.webp'
];

aiAssets.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buf = createLosslessWebP();
  fs.writeFileSync(fullPath, buf);
  console.log(`Generated AI WebP Asset: ${filePath}`);
});

console.log('All AI WebP image assets generated successfully.');
