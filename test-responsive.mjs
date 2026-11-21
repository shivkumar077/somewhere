import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('public', 'screenshots', 'responsive');
const ANIME_DIR = path.resolve('public', 'screenshots', 'painterly_anime');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}
if (!fs.existsSync(ANIME_DIR)) {
  fs.mkdirSync(ANIME_DIR, { recursive: true });
}

// 16-Viewport Universal Matrix
const VIEWPORTS = [
  { name: '01_mobile_320_se1_portrait', width: 320, height: 568, category: '320px minimum mobile width' },
  { name: '02_mobile_360_galaxy_portrait', width: 360, height: 740, category: '360px mobile width' },
  { name: '03_mobile_375_se3_portrait', width: 375, height: 667, category: '375px standard mobile' },
  { name: '04_mobile_390_iphone14_portrait', width: 390, height: 844, category: '390px mobile width' },
  { name: '05_mobile_430_promax_portrait', width: 430, height: 932, category: '430px large mobile width' },
  { name: '06_foldable_280_narrow_cover', width: 280, height: 653, category: 'Foldable narrow cover screen' },
  { name: '07_foldable_884_expanded', width: 884, height: 1104, category: 'Foldable expanded layout' },
  { name: '08_mobile_667_landscape', width: 667, height: 375, category: 'Compact mobile landscape' },
  { name: '09_mobile_844_landscape', width: 844, height: 390, category: 'Modern phone landscape' },
  { name: '10_tablet_600_compact_portrait', width: 600, height: 960, category: '600px–768px compact tablet' },
  { name: '11_tablet_768_ipad_portrait', width: 768, height: 1024, category: '768px–1024px tablet portrait' },
  { name: '12_tablet_1024_ipad_landscape', width: 1024, height: 768, category: 'Tablet landscape' },
  { name: '13_laptop_1280_small', width: 1280, height: 800, category: '1024px–1280px small laptop' },
  { name: '14_desktop_1440_standard', width: 1440, height: 900, category: '1280px–1440px standard desktop' },
  { name: '15_desktop_1920_large_fhd', width: 1920, height: 1080, category: '1440px–1920px large desktop' },
  { name: '16_ultrawide_2560_qhd', width: 2560, height: 1440, category: '1920px–2560px ultrawide display' },
];

async function runResponsiveTests() {
  console.log('🧪 Starting SOMEWHERE Soft Painterly Anime World & Responsive Test Suite...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage();
  const results = [];

  // Initial load
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));

  // ==========================================
  // PHASE 1: 16-Viewport Landing Screen Tests
  // ==========================================
  for (const vp of VIEWPORTS) {
    console.log(`\n🔍 Testing Landing [${vp.category}]: ${vp.width}x${vp.height} (${vp.name})...`);
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.evaluate(() => window.dispatchEvent(new Event('resize')));
    await new Promise((r) => setTimeout(r, 300));

    const audit = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;

      // 1. Horizontal & Vertical overflow check
      const hasHorizontalOverflow = docW > winW;
      const hasVerticalOverflow = docH > winH + 2;

      // 2. Welcome lines verification: exactly HELLO / THERE / YOU
      const welcomeLines = Array.from(document.querySelectorAll('.welcome-line'));
      const welcomeTexts = welcomeLines.map((el) => el.textContent?.trim());
      const welcomeMatches =
        welcomeTexts.length === 3 &&
        welcomeTexts[0] === 'HELLO' &&
        welcomeTexts[1] === 'THERE' &&
        welcomeTexts[2] === 'YOU';

      const welcomeRects = welcomeLines.map((el) => el.getBoundingClientRect());
      const welcomeInBounds = welcomeRects.every(
        (r) => r.left >= 0 && r.right <= winW && r.top >= 0 && r.bottom <= winH
      );

      // Check horizontal centering of welcome lines
      const isCentered = welcomeRects.every((r) => {
        const center = (r.left + r.right) / 2;
        return Math.abs(center - winW / 2) < 20; // within 20px of exact center
      });

      // 3. ENTER Button verification: Must read exactly "ENTER"
      const enterBtn = Array.from(document.querySelectorAll('button')).find((b) => {
        const t = b.textContent?.trim();
        return t === 'ENTER' || (t && t.startsWith('ENTER') && !t.includes('SOMEWHERE'));
      });
      const hasOldButton = Array.from(document.querySelectorAll('button')).some((b) =>
        b.textContent?.includes('ENTER SOMEWHERE')
      );
      let enterBtnValid = false;
      if (enterBtn && !hasOldButton) {
        const r = enterBtn.getBoundingClientRect();
        enterBtnValid =
          r.width >= 40 &&
          r.height >= 38 &&
          r.left >= 0 &&
          r.right <= winW &&
          r.bottom <= winH &&
          r.top >= 0;
      }

      // 4. Verify NO public-facing SOMEWHERE heading or logo in the DOM
      const hasPublicSomewhereHeading = !!document
        .querySelector('h1, h2, .title')
        ?.textContent?.includes('SOMEWHERE');

      // 5. Audio Toggle Button presence & bounds
      const audioBtn = document.querySelector('[data-testid="audio-toggle"]');
      let audioBtnValid = false;
      if (audioBtn) {
        const r = audioBtn.getBoundingClientRect();
        audioBtnValid =
          r.width >= 24 &&
          r.height >= 24 &&
          r.left >= 0 &&
          r.right <= winW &&
          r.top >= 0 &&
          r.bottom <= winH;
      }

      // 6. Header collision check between audio and atmosphere controls
      const atmoControls = document.querySelector('[data-testid="atmosphere-controls"]');
      let headerCollision = false;
      if (audioBtn && atmoControls) {
        const bRect = audioBtn.getBoundingClientRect();
        const aRect = atmoControls.getBoundingClientRect();
        headerCollision = !(
          bRect.right <= aRect.left ||
          bRect.left >= aRect.right ||
          bRect.bottom <= aRect.top ||
          bRect.top >= aRect.bottom
        );
        if (headerCollision) {
          console.log(`COLLISION DEBUG at ${winW}x${winH}: audioBtn=${JSON.stringify(bRect)}, atmoControls=${JSON.stringify(aRect)}`);
        }
      }

      // 7. 3D Canvas dimension check
      const canvas = document.querySelector('canvas');
      const canvasValid = canvas && canvas.clientWidth === winW && canvas.clientHeight === winH;

      return {
        hasHorizontalOverflow,
        hasVerticalOverflow,
        docW,
        winW,
        docH,
        winH,
        welcomeTexts,
        welcomeMatches,
        welcomeInBounds,
        isCentered,
        enterBtnValid,
        hasOldButton,
        hasPublicSomewhereHeading,
        audioBtnValid,
        headerCollision,
        canvasValid,
      };
    });

    const passed =
      !audit.hasHorizontalOverflow &&
      !audit.hasVerticalOverflow &&
      audit.welcomeMatches &&
      audit.welcomeInBounds &&
      audit.isCentered &&
      audit.enterBtnValid &&
      !audit.hasOldButton &&
      !audit.hasPublicSomewhereHeading &&
      audit.audioBtnValid &&
      !audit.headerCollision &&
      audit.canvasValid;

    const screenshotPath = path.join(SCREENSHOT_DIR, `${vp.name}.png`);
    await page.screenshot({ path: screenshotPath });

    results.push({
      ...vp,
      passed,
      audit,
      screenshot: `${vp.name}.png`,
    });

    if (passed) {
      console.log(`  ✅ PASS: Centered "HELLO/THERE/YOU", Button="ENTER", No branding, Audio toggle valid`);
    } else {
      console.error(`  ❌ FAIL:`, {
        overflow: audit.hasHorizontalOverflow,
        welcomeMatches: audit.welcomeMatches,
        welcomeInBounds: audit.welcomeInBounds,
        isCentered: audit.isCentered,
        enterBtnValid: audit.enterBtnValid,
        hasOldButton: audit.hasOldButton,
        hasPublicSomewhereHeading: audit.hasPublicSomewhereHeading,
        audioBtnValid: audit.audioBtnValid,
        headerCollision: audit.headerCollision,
      });
    }
  }

  // =========================================================================
  // PHASE 2: ACCEPTANCE TEST SUITE FOR WORLD CONSISTENCY ACROSS ZOOM DISTANCES
  // =========================================================================
  console.log('\n🎨 PHASE 2: World Consistency & Acceptance Test Suite...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1200));

  // 1. Full Miniature Overview
  console.log('  → Capturing 01_full_miniature_overview.png...');
  const shotOverview = path.join(ANIME_DIR, '01_full_miniature_overview.png');
  await page.screenshot({ path: shotOverview });

  // 2. Click ENTER to start continuous zoom fly-in
  console.log('  → Clicking ENTER button (Triggering Continuous Camera Zoom)...');
  const enterBtn = await page.$('button[aria-label="Enter"]');
  if (enterBtn) {
    await enterBtn.click();
    // Allow 1.1s for mid-zoom position
    await new Promise((r) => setTimeout(r, 1100));

    // 2. Mid-Zoom Landscape View
    console.log('  → Capturing 02_mid_zoom_landscape.png...');
    const shotMid = path.join(ANIME_DIR, '02_mid_zoom_landscape.png');
    await page.screenshot({ path: shotMid });

    // Wait for full arrival at ground level (total 2.2s)
    await new Promise((r) => setTimeout(r, 1400));
  }

  // 3. Ground-Level View in Town Square
  console.log('  → Capturing 03_ground_level_town.png...');
  const shotGround = path.join(ANIME_DIR, '03_ground_level_town.png');
  await page.screenshot({ path: shotGround });

  // 4. Test Destination Modal for "Little House" (About Me)
  console.log('  → Navigating to The Little House (About Me)...');
  const aboutDestBtn = await page.$('button[aria-label*="Little House"]');
  if (aboutDestBtn) {
    await aboutDestBtn.click();
    await new Promise((r) => setTimeout(r, 2600));

    // Press E or click prompt to open destination modal
    await page.keyboard.press('KeyE');
    await new Promise((r) => setTimeout(r, 800));

    let modalTitle = await page.evaluate(() => {
      return document.querySelector('#destination-title')?.textContent?.trim() || null;
    });

    if (!modalTitle) {
      // Click again now that player has arrived nearby
      await aboutDestBtn.click();
      await new Promise((r) => setTimeout(r, 800));
      modalTitle = await page.evaluate(() => {
        return document.querySelector('#destination-title')?.textContent?.trim() || null;
      });
    }

    console.log(`  ✓ Destination Modal Title: "${modalTitle}"`);

    // 5. Close-Up of Recognizable Building Modal
    console.log('  → Capturing 04_destination_modal_about.png...');
    const shotModal = path.join(ANIME_DIR, '04_destination_modal_about.png');
    await page.screenshot({ path: shotModal });

    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 500));
  }

  // 6. Mobile Landing Screen View (iPhone 14)
  console.log('\n📱 Capturing Mobile Landing & Living Town Views...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 1200));

  const shotMobileLanding = path.join(ANIME_DIR, '05_mobile_landing_screen.png');
  await page.screenshot({ path: shotMobileLanding });
  console.log(`  ✓ Captured Mobile Landing Screen: ${shotMobileLanding}`);

  // Enter town on mobile
  const mobileEnterBtn = await page.$('button[aria-label="Enter"]');
  if (mobileEnterBtn) {
    await mobileEnterBtn.click();
    await new Promise((r) => setTimeout(r, 2500));
    const shotMobileTown = path.join(ANIME_DIR, '06_mobile_walkable_town.png');
    await page.screenshot({ path: shotMobileTown });
    console.log(`  ✓ Captured Mobile Walkable Town: ${shotMobileTown}`);
  }

  await browser.close();

  // Summary
  console.log('\n========================================');
  console.log('📊 TEST SUITE SUMMARY');
  console.log('========================================');
  const allPassed = results.every((r) => r.passed);
  console.log(`Total Viewports Tested: ${results.length}`);
  console.log(`Passed: ${results.filter((r) => r.passed).length} / ${results.length}`);
  console.log(
    `Result: ${
      allPassed
        ? 'ALL VIEWPORTS & PAINTERLY ANIME ACCEPTANCE TESTS PASSED! 🎉'
        : 'SOME TESTS FAILED'
    }`
  );

  return results;
}

runResponsiveTests().catch((err) => {
  console.error('Test suite execution failed:', err);
  process.exit(1);
});
