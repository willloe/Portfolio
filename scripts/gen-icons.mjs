import sharp from 'sharp';

const src = 'public/favicon.svg';

await sharp(src).resize(192, 192).png().toFile('public/pwa-192x192.png');
await sharp(src).resize(512, 512).png().toFile('public/pwa-512x512.png');
await sharp(src).resize(180, 180).png().toFile('public/apple-touch-icon.png');

console.log('Generated pwa-192x192.png, pwa-512x512.png, apple-touch-icon.png');
