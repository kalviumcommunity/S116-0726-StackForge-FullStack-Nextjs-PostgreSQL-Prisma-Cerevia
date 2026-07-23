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

const communityAssets = [
  'public/images/community/avatars/rank1.webp',
  'public/images/community/avatars/rank2.webp',
  'public/images/community/avatars/rank3.webp',
  'public/images/community/avatars/friend1.webp',
  'public/images/community/avatars/friend2.webp',
  'public/images/community/leagues/bronze.webp',
  'public/images/community/leagues/silver.webp',
  'public/images/community/leagues/gold.webp',
  'public/images/community/leagues/platinum.webp',
  'public/images/community/leagues/diamond.webp',
  'public/images/community/leagues/master.webp',
  'public/images/community/leagues/legend.webp',
  'public/images/community/badges/spotlight.webp',
  'public/images/community/badges/crown-gold.webp',
  'public/images/community/badges/crown-silver.webp',
  'public/images/community/badges/crown-bronze.webp',
  'public/images/community/podium/podium-bg.webp',
  'public/images/community/podium/glow-ring.webp',
  'public/images/community/backgrounds/hero-mesh.webp',
  'public/images/community/backgrounds/league-banner.webp',
  'public/images/community/illustrations/community-feed.webp',
  'public/images/community/illustrations/leaderboard-trophy.webp'
];

communityAssets.forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buf = createLosslessWebP();
  fs.writeFileSync(fullPath, buf);
  console.log(`Generated Community WebP Asset: ${filePath}`);
});

console.log('All Community WebP image assets generated successfully.');
