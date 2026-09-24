import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outDir = '/home/z/my-project/public';
fs.mkdirSync(outDir, { recursive: true });

const jobs = [
  {
    name: 'og-image.png',
    size: '1216x640',
    prompt:
      'Abstract minimalist technology banner, clean white background, subtle light blue blueprint grid pattern, large elegant concentric circular arcs made of horizontal stripes in deep blue on the left side, thin cyan horizontal accent line sweeping across, soft blue gradient glow bottom right, flat geometric corporate art, generous negative space, no text, no letters, no words, no typography, no brand logos'
  }
];

const zai = await ZAI.create();

for (const job of jobs) {
  const outPath = path.join(outDir, job.name);
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 10000) {
    console.log(`skip existing ${job.name}`);
    continue;
  }
  let ok = false;
  for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
    try {
      const response = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size
      });
      const b64 = response.data?.[0]?.base64;
      if (!b64) throw new Error('no image data');
      fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
      console.log(`OK ${job.name} (${Math.round(fs.statSync(outPath).size / 1024)} KB)`);
      ok = true;
    } catch (err) {
      console.error(`attempt ${attempt} failed for ${job.name}: ${err.message}`);
      await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
}
console.log('DONE');
