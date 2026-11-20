import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('public', 'screenshots', 'refinement');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const ARTIFACT_DIR = 'C:\\Users\\sk699\\.gemini\\antigravity\\brain\\85a804ef-4d32-4e7b-81c0-c047bb7ffa42\\refinement';
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

async function captureRefinements() {
  console.log('📸 Capturing refined landing experience screenshots...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage();

  // 1. Desktop Standard 1440x900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1400));
  const shot1 = path.join(SCREENSHOT_DIR, '01_desktop_1440_refined.png');
  await page.screenshot({ path: shot1 });
  fs.copyFileSync(shot1, path.join(ARTIFACT_DIR, '01_desktop_1440_refined.png'));
  console.log('✓ Captured 01_desktop_1440_refined.png');

  // 2. Mobile 390x844 iPhone 14
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1400));
  const shot2 = path.join(SCREENSHOT_DIR, '02_mobile_390_refined.png');
  await page.screenshot({ path: shot2 });
  fs.copyFileSync(shot2, path.join(ARTIFACT_DIR, '02_mobile_390_refined.png'));
  console.log('✓ Captured 02_mobile_390_refined.png');

  // 3. Tablet 768x1024 iPad Portrait
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1400));
  const shot3 = path.join(SCREENSHOT_DIR, '03_tablet_768_refined.png');
  await page.screenshot({ path: shot3 });
  fs.copyFileSync(shot3, path.join(ARTIFACT_DIR, '03_tablet_768_refined.png'));
  console.log('✓ Captured 03_tablet_768_refined.png');

  // 4. Desktop with Audio Active
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  const audioBtn = await page.$('[data-testid="audio-toggle"]');
  if (audioBtn) {
    await audioBtn.click();
    await new Promise(r => setTimeout(r, 600));
  }
  const shot4 = path.join(SCREENSHOT_DIR, '04_desktop_sound_active.png');
  await page.screenshot({ path: shot4 });
  fs.copyFileSync(shot4, path.join(ARTIFACT_DIR, '04_desktop_sound_active.png'));
  console.log('✓ Captured 04_desktop_sound_active.png');

  await browser.close();
  console.log('🎉 All refinement screenshots captured and saved to artifact directory!');
}

captureRefinements().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
