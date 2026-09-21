import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, drawPixelFn) {
  const rowSize = width * 4 + 1;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawPixelFn(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const combined = Buffer.concat([typeBuf, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(combined), 0);
    return Buffer.concat([len, combined, crc]);
  }

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Draw Greek Alpha (α) App Icon
function mathIconPainter(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const radius = isMaskable ? w * 0.48 : w * 0.44;

  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background gradient: Dark Slate to Deep Teal
  const t = (x + y) / (w + h);
  let bgR = Math.round(2 + 8 * t);
  let bgG = Math.round(6 + 28 * t);
  let bgB = Math.round(23 + 24 * t);

  if (!isMaskable && dist > radius) {
    return [0, 0, 0, 0];
  }

  if (Math.abs(dist - radius) < w * 0.015) {
    return [45, 212, 191, 220]; // Teal accent border
  }

  // Normalized coords for Greek Alpha (α): nx in [-1, 1], ny in [-1, 1]
  const nx = (x - cx) / (w * 0.38);
  const ny = (y - cy) / (h * 0.38);

  // Loop of alpha on the left: centered around (-0.2, 0)
  const loopDist = Math.sqrt(Math.pow((nx - (-0.2)) / 0.52, 2) + Math.pow(ny / 0.52, 2));
  const isLoopBand = loopDist >= 0.65 && loopDist <= 1.05 && nx <= 0.2;

  // Upper right leg / stroke: line from (0.0, 0.0) going up-right to (0.7, -0.6)
  const upLineDist = Math.abs(ny - (-0.85 * nx));
  const isUpStroke = upLineDist <= 0.22 && nx >= -0.1 && nx <= 0.75 && ny >= -0.7 && ny <= 0.15;

  // Lower right leg / stroke: line from (0.0, 0.0) going down-right to (0.7, 0.6)
  const downLineDist = Math.abs(ny - (0.85 * nx));
  const isDownStroke = downLineDist <= 0.22 && nx >= -0.1 && nx <= 0.75 && ny >= -0.15 && ny <= 0.7;

  if (isLoopBand || isUpStroke || isDownStroke) {
    const gradFactor = (nx + ny + 2) / 4;
    const r = Math.round(45 + 10 * gradFactor);
    const g = Math.round(212 + (182 - 212) * gradFactor);
    const b = Math.round(191 + (248 - 191) * gradFactor);
    return [r, g, b, 255];
  }

  return [bgR, bgG, bgB, 255];
}

const sizes = [
  { file: 'pwa-192x192.png', size: 192, maskable: false },
  { file: 'pwa-512x512.png', size: 512, maskable: false },
  { file: 'pwa-maskable-512x512.png', size: 512, maskable: true },
  { file: 'apple-touch-icon.png', size: 180, maskable: false },
  { file: 'favicon.ico', size: 64, maskable: false },
];

if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

for (const { file, size, maskable } of sizes) {
  const pngBuf = createPNG(size, size, (x, y, w, h) => mathIconPainter(x, y, w, h, maskable));
  fs.writeFileSync(`public/${file}`, pngBuf);
  console.log(`Generated public/${file} (${size}x${size})`);
}

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617" />
      <stop offset="50%" stop-color="#0b1e2e" />
      <stop offset="100%" stop-color="#042f2e" />
    </linearGradient>
    <linearGradient id="alphaGrad" x1="15%" y1="10%" x2="85%" y2="90%">
      <stop offset="0%" stop-color="#2dd4bf" />
      <stop offset="50%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#2dd4bf" flood-opacity="0.45" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="120" fill="url(#bgGrad)" stroke="#2dd4bf" stroke-width="8" stroke-opacity="0.4"/>
  <path
    d="M 405 150 C 370 150 330 190 290 250 C 255 195 210 160 160 160 C 95 160 50 205 50 270 C 50 335 95 380 160 380 C 210 380 255 345 290 290 C 330 350 370 390 405 390 C 420 390 432 380 435 365 C 438 350 430 338 415 335 C 385 330 350 295 320 250 C 350 205 385 170 415 165 C 430 162 438 150 435 135 C 432 120 420 110 405 110 C 390 110 375 125 360 145 M 160 210 C 190 210 220 235 250 270 C 220 305 190 330 160 330 C 125 330 100 305 100 270 C 100 235 125 210 160 210 Z"
    fill="url(#alphaGrad)"
    filter="url(#glow)"
  />
</svg>`;

fs.writeFileSync('public/icon.svg', svgContent);
console.log('Generated public/icon.svg');
