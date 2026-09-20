import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, drawPixelFn) {
  // RGBA buffer: (width * 4 + 1 filter byte) * height
  const rowSize = width * 4 + 1;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)
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

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // CRC32 table & calculator
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

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: 6 (RGBA)
  ihdrData[10] = 0; // Compression: 0
  ihdrData[11] = 0; // Filter: 0
  ihdrData[12] = 0; // Interlace: 0

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Draw Math 3 App Icon (Dark teal gradient background with Math icon / stylized M3)
function mathIconPainter(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const radius = isMaskable ? w * 0.48 : w * 0.44;

  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background gradient: Dark Slate to Deep Teal
  const t = (x + y) / (w + h);
  let bgR = Math.round(15 + 5 * t);
  let bgG = Math.round(23 + 45 * t);
  let bgB = Math.round(42 + 40 * t);

  // Outer rounded border
  if (!isMaskable && dist > radius) {
    return [0, 0, 0, 0]; // Transparent outside circle for non-maskable standard icon
  }

  // Border ring highlight
  if (Math.abs(dist - radius) < w * 0.015) {
    return [45, 212, 191, 220]; // Teal accent border
  }

  // Draw stylized Math "∫" symbol or "M3" in center
  // Normalized coordinates (-1 to 1) inside safe zone
  const nx = (x - cx) / (w * 0.35);
  const ny = (y - cy) / (h * 0.35);

  // Draw Integral sign curve: x = 0.3 * sin(ny * PI)
  const curveX = 0.25 * Math.sin(ny * 2.5);
  const curveDist = Math.abs(nx - curveX);

  if (ny >= -0.85 && ny <= 0.85 && curveDist < 0.14) {
    // Gradient on integral symbol (Teal to Cyan)
    return [45, 212, 191, 255];
  }

  // Top and bottom curl of integral
  const topCurlDist = Math.sqrt(Math.pow(nx - 0.22, 2) + Math.pow(ny - (-0.85), 2));
  const btmCurlDist = Math.sqrt(Math.pow(nx - (-0.22), 2) + Math.pow(ny - 0.85, 2));
  if (topCurlDist < 0.16 || btmCurlDist < 0.16) {
    return [45, 212, 191, 255];
  }

  // Subtle "3" superscript near top right
  const supX = (x - (cx + w * 0.18)) / (w * 0.12);
  const supY = (y - (cy - h * 0.16)) / (h * 0.12);
  const supDist = Math.sqrt(supX * supX + supY * supY);
  if (supDist < 0.7 && supDist > 0.4 && supX > -0.2) {
    return [251, 191, 36, 255]; // Amber "3"
  }

  return [bgR, bgG, bgB, 255];
}

// Generate Icons
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

// Also write public/icon.svg
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#091828" />
      <stop offset="100%" stop-color="#0d3b4c" />
    </linearGradient>
    <linearGradient id="tealGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2dd4bf" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#2dd4bf" flood-opacity="0.3" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="110" fill="url(#bgGrad)" stroke="#2dd4bf" stroke-width="8" stroke-opacity="0.5"/>
  <path d="M 270 120 C 270 95 245 80 220 80 C 190 80 175 105 175 130 C 175 160 200 180 235 225 L 275 285 C 310 330 335 355 335 385 C 335 410 320 435 290 435 C 265 435 240 420 240 395" fill="none" stroke="url(#tealGrad)" stroke-width="32" stroke-linecap="round" filter="url(#glow)"/>
  <!-- Superscript 3 in Amber -->
  <text x="350" y="190" font-family="system-ui, -apple-system, sans-serif" font-size="110" font-weight="900" fill="#fbbf24" filter="url(#glow)">3</text>
  <!-- Base label "MATH" -->
  <text x="256" y="475" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="800" fill="#94a3b8" text-anchor="middle" letter-spacing="4">MATH 3</text>
</svg>`;

fs.writeFileSync('public/icon.svg', svgContent);
console.log('Generated public/icon.svg');
