/**
 * Generates 3 images for the "5 Conexiom Alternatives" article
 * using the Gemini image generation REST API.
 *
 * Run: node generate-conexiom-images.mjs
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const API_KEY = 'AIzaSyDHGFozOmoQVvXtHATA6SQAGuUfFQvn2lc';
const MODEL = 'nano-banana-pro-preview';
const OUT_DIR = '/Users/denizerkan/Documents/projects/orderflow/public/images/articles';

const images = [
  {
    file: 'conexiom-alternatives-hero.webp',
    width: 1920,
    height: 1080,
    prompt:
      'A static, realistic photograph of a clean modern office desk from a slight overhead angle. On the desk: a printed PDF purchase order document, a smartphone showing a WhatsApp conversation with a short order message in green bubbles, a handwritten note with order details on paper, and a laptop screen displaying a clean order management software interface with a table of order line items. Natural soft daylight from the side. Muted tones, white and light grey desk surface. Professional B2B setting. No illustrations, no icons, no glowing elements, no motion blur, no digital effects, no text overlays. Pure still photography style.',
  },
  {
    file: 'conexiom-alternatives-list.webp',
    width: 816,
    height: 640,
    prompt:
      'A static, realistic photograph of a tidy office desk from directly above (flat lay). On the desk: a printed purchase order document, a smartphone showing a WhatsApp chat with a short order message, a handwritten note on paper, and a pen. Clean white desk surface. Soft even lighting. No illustrations, no icons, no glowing elements, no motion blur, no digital effects, no text overlays, no animation. Pure still photography style. Professional, minimal, well-composed.',
  },
  {
    file: 'conexiom-alternatives-og.webp',
    width: 1200,
    height: 630,
    prompt:
      'A static, realistic photograph of a professional sitting at a clean office desk looking at a laptop screen displaying an order management dashboard. On the desk beside the laptop: a printed purchase order and a smartphone. Soft natural light, modern office environment, neutral tones. No illustrations, no icons, no glowing elements, no motion blur, no digital effects, no text overlays, no animation. Pure still photography style. Professional, clean, suitable for social media sharing.',
  },
];

function post(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(url, options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString();
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${raw}`));
          return;
        }
        try {
          resolve(JSON.parse(raw));
        } catch (e) {
          reject(new Error(`JSON parse error: ${e.message}\nBody: ${raw.slice(0, 500)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function generateImage(img) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  const body = {
    contents: [
      {
        parts: [{ text: img.prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  };

  console.log(`\nGenerating: ${img.file} (${img.width}x${img.height})`);

  const response = await post(url, body);

  const candidates = response.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith('image/')) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        const outPath = path.join(OUT_DIR, img.file);
        await sharp(buffer)
          .resize(img.width, img.height, { fit: 'cover', position: 'centre' })
          .webp({ quality: 85 })
          .toFile(outPath);
        const sizeKB = Math.round(fs.statSync(outPath).size / 1024);
        console.log(`  Saved: ${outPath} (${img.width}x${img.height}, ${sizeKB} KB)`);
        return outPath;
      }
    }
  }

  throw new Error(`No image data in response for ${img.file}. Response: ${JSON.stringify(response).slice(0, 500)}`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const results = [];
  for (const img of images) {
    try {
      const outPath = await generateImage(img);
      results.push({ file: img.file, path: outPath, status: 'ok' });
    } catch (err) {
      console.error(`  ERROR generating ${img.file}: ${err.message}`);
      results.push({ file: img.file, status: 'error', error: err.message });
    }
  }

  console.log('\n--- Summary ---');
  for (const r of results) {
    if (r.status === 'ok') {
      const sizeKB = Math.round(fs.statSync(r.path).size / 1024);
      console.log(`  [OK]    ${r.file} — ${sizeKB} KB — ${r.path}`);
    } else {
      console.log(`  [FAIL]  ${r.file} — ${r.error}`);
    }
  }
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
