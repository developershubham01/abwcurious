import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outDir = '/home/z/my-project/public/images';
fs.mkdirSync(outDir, { recursive: true });

const jobs = [
  {
    name: 'hero-neural.jpg',
    size: '1344x768',
    prompt:
      'Futuristic abstract artificial intelligence neural network visualization, glowing electric blue nodes and connections on deep dark charcoal background, flowing data streams, depth of field, cinematic lighting, ultra detailed digital art, high quality'
  },
  {
    name: 'work-crm.jpg',
    size: '1152x864',
    prompt:
      'Modern CRM software dashboard on laptop screen in dark office, blue interface charts and analytics, moody lighting, professional product photography, high quality'
  },
  {
    name: 'work-chatbot.jpg',
    size: '1152x864',
    prompt:
      'AI chatbot assistant interface on smartphone floating above dark desk, glowing blue message bubbles, futuristic technology photography, high quality, detailed'
  },
  {
    name: 'work-web.jpg',
    size: '1152x864',
    prompt:
      'Sleek modern website design displayed on desktop monitor in dark studio, blue accent lighting, clean UI layout, professional technology photography, high quality'
  },
  {
    name: 'work-erp.jpg',
    size: '1152x864',
    prompt:
      'Enterprise ERP software with supply chain data visualization on large wall screen, dark control room, blue glowing charts, cinematic technology photography, high quality'
  },
  {
    name: 'work-design.jpg',
    size: '1152x864',
    prompt:
      'UI UX designer workspace with wireframes and design system components on screen, dark modern desk with blue ambient light, professional photography, high quality'
  },
  {
    name: 'work-mobile.jpg',
    size: '1152x864',
    prompt:
      'Modern mobile app development, multiple smartphones showing app screens on dark surface with blue neon glow, professional product photography, high quality'
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
