import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('public', 'screenshots', 'milestone-02');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const ARTIFACT_DIR = 'C:\\Users\\sk699\\.gemini\\antigravity\\brain\\85a804ef-4d32-4e7b-81c0-c047bb7ffa42\\milestone-02';
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

async function captureMilestone02() {
  console.log('📸 Starting Milestone 02 Visual & Responsive Capture Suite...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage();

  // 1. Desktop Standard 1440x900 - Multiple Angles
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // Shot 1: Angle 0° - Town Center & Market Plaza
  const shot1 = path.join(SCREENSHOT_DIR, '01_town_center_plaza.png');
  await page.screenshot({ path: shot1 });
  fs.copyFileSync(shot1, path.join(ARTIFACT_DIR, '01_town_center_plaza.png'));
  console.log('✓ Captured 01_town_center_plaza.png');

  // Shot 2: Rotate around to 90° - Meadow Mill & Allotments
  await page.mouse.move(720, 500);
  await page.mouse.down();
  await page.mouse.move(300, 500, { steps: 25 });
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 1000));
  const shot2 = path.join(SCREENSHOT_DIR, '02_meadow_mill_allotments.png');
  await page.screenshot({ path: shot2 });
  fs.copyFileSync(shot2, path.join(ARTIFACT_DIR, '02_meadow_mill_allotments.png'));
  console.log('✓ Captured 02_meadow_mill_allotments.png');

  // Shot 3: Rotate around to 180° - Harbor & Azure Lagoon
  await page.mouse.move(720, 500);
  await page.mouse.down();
  await page.mouse.move(300, 500, { steps: 25 });
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 1000));
  const shot3 = path.join(SCREENSHOT_DIR, '03_harbor_azure_lagoon.png');
  await page.screenshot({ path: shot3 });
  fs.copyFileSync(shot3, path.join(ARTIFACT_DIR, '03_harbor_azure_lagoon.png'));
  console.log('✓ Captured 03_harbor_azure_lagoon.png');

  // Shot 4: Rotate around to 270° - Stargazer Bluffs & Tea Terraces
  await page.mouse.move(720, 500);
  await page.mouse.down();
  await page.mouse.move(300, 500, { steps: 25 });
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 1000));
  const shot4 = path.join(SCREENSHOT_DIR, '04_stargazer_bluffs_observatory.png');
  await page.screenshot({ path: shot4 });
  fs.copyFileSync(shot4, path.join(ARTIFACT_DIR, '04_stargazer_bluffs_observatory.png'));
  console.log('✓ Captured 04_stargazer_bluffs_observatory.png');

  // Shot 5: Walkable World Preview (Click ENTER then switch view)
  // First reload to reset orientation
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  
  // Click ENTER button
  const enterBtn = await page.$('button');
  if (enterBtn) {
    await enterBtn.click();
    await new Promise(r => setTimeout(r, 1500));
  }

  // Look for View Mode toggle button ("Switch to Walkable Grid")
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Walkable')) {
      await b.click();
      await new Promise(r => setTimeout(r, 1200));
      break;
    }
  }

  const shot5 = path.join(SCREENSHOT_DIR, '05_walkable_world_projection.png');
  await page.screenshot({ path: shot5 });
  fs.copyFileSync(shot5, path.join(ARTIFACT_DIR, '05_walkable_world_projection.png'));
  console.log('✓ Captured 05_walkable_world_projection.png (Dual-rendering proof)');

  // Responsive device snapshots
  // Shot 6: Tablet 768x1024 Portrait
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 1200));
  const shot6 = path.join(SCREENSHOT_DIR, '06_tablet_portrait_768.png');
  await page.screenshot({ path: shot6 });
  fs.copyFileSync(shot6, path.join(ARTIFACT_DIR, '06_tablet_portrait_768.png'));
  console.log('✓ Captured 06_tablet_portrait_768.png');

  // Shot 7: Mobile 390x844 iPhone 14
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 1200));
  const shot7 = path.join(SCREENSHOT_DIR, '07_mobile_iphone14_390.png');
  await page.screenshot({ path: shot7 });
  fs.copyFileSync(shot7, path.join(ARTIFACT_DIR, '07_mobile_iphone14_390.png'));
  console.log('✓ Captured 07_mobile_iphone14_390.png');

  // Shot 8: Foldable 280x653 Narrow Cover
  await page.setViewport({ width: 280, height: 653, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 1200));
  const shot8 = path.join(SCREENSHOT_DIR, '08_foldable_narrow_280.png');
  await page.screenshot({ path: shot8 });
  fs.copyFileSync(shot8, path.join(ARTIFACT_DIR, '08_foldable_narrow_280.png'));
  console.log('✓ Captured 08_foldable_narrow_280.png');

  await browser.close();
  console.log('\n🎉 All Milestone 02 multi-angle and responsive screenshots captured successfully!');
}

captureMilestone02().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
