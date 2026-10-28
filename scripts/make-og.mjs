// Generates public/og.png (1200x630) for social previews. Run: node scripts/make-og.mjs
import sharp from 'sharp';

const cols = ['#5bd18f', '#4fd0e0', '#e6b24f', '#ec6a7c'];
const bars = Array.from({ length: 28 }, (_, i) => {
  const h = 40 + ((i * 53) % 150);
  return `<rect x="${60 + i * 40}" y="${560 - h}" width="22" height="${h}" fill="${cols[i % 4]}" opacity="${0.25 + ((i * 7) % 5) * 0.12}"/>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#0a0f16"/>
${bars}
<text x="60" y="170" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="84" fill="#e3e9f1">Axl S. Cepeda</text>
<text x="60" y="235" font-family="Menlo, monospace" font-size="30" fill="#78b4ff">Infectious disease genomics · Evolution · Bioinformatics</text>
<text x="60" y="290" font-family="Menlo, monospace" font-size="24" fill="#8d9bb0">PhD Biology, Temple University · Visiting Scholar, Escalante Lab</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
