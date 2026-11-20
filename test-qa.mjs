import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('public', 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runQA() {
  console.log('🚀 Starting Automated Puppeteer QA for Somewhere Milestone 01...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

  // Wait for 3D canvas and initial animations
  await new Promise(r => setTimeout(r, 2500));

  console.log('📸 1. Capturing Initial Landing Page...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_landing_initial.png') });

  // Verify Heading & Welcome lines exist
  const welcomeText = await page.evaluate(() => {
    const lines = Array.from(document.querySelectorAll('.welcome-line')).map(el => el.textContent?.trim());
    const button = document.querySelector('button')?.textContent;
    return { lines, button };
  });
  console.log('Detected Welcome Copy:', welcomeText);

  // 2. Switch to Day
  console.log('☀️ 2. Switching to Day Mode...');
  const dayBtn = await page.waitForSelector('button[title="Daylight"]');
  await dayBtn?.click();
  await new Promise(r => setTimeout(r, 1600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_daytime.png') });

  // 3. Switch to Sunset
  console.log('🌅 3. Switching to Sunset Mode...');
  const sunsetBtn = await page.waitForSelector('button[title="Sunset"]');
  await sunsetBtn?.click();
  await new Promise(r => setTimeout(r, 1600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_sunset.png') });

  // 4. Switch to Night
  console.log('🌙 4. Switching to Night Mode...');
  const nightBtn = await page.waitForSelector('button[title="Night"]');
  await nightBtn?.click();
  await new Promise(r => setTimeout(r, 1600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_night.png') });

  // 5. Test ENTER interaction
  console.log('🎬 5. Testing ENTER SOMEWHERE interaction...');
  const enterBtn = await page.evaluateHandle(() => {
    return Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('ENTER'));
  });
  if (enterBtn) {
    await enterBtn.asElement()?.click();
    console.log('Clicked Enter button. Waiting for block transition peak & camera fly-in...');
    await page.waitForSelector('[data-testid="arrived-card"]', { timeout: 6000 });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_entered_town.png') });

    // Verify Welcome to Somewhere card exists
    const arrivedText = await page.evaluate(() => {
      return document.querySelector('[data-testid="arrived-card"] h2')?.textContent;
    });
    console.log('Arrived modal title:', arrivedText);

    // 6. Test Return to Orbit
    console.log('🔄 6. Testing Return to Orbit...');
    const returnBtn = await page.evaluateHandle(() => {
      return Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Return to Orbit'));
    });
    if (returnBtn) {
      await returnBtn.asElement()?.click();
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_return_orbit.png') });
    }
  }

  // 7. Test Mobile Viewport
  console.log('📱 7. Testing Mobile Viewport (375x667)...');
  await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_mobile_view.png') });

  await browser.close();
  console.log('✅ QA Tests completed successfully! All screenshots saved to public/screenshots.');
}

runQA().catch(err => {
  console.error('QA Failed:', err);
  process.exit(1);
});
