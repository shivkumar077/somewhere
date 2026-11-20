import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('public', 'screenshots', 'responsive');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Comprehensive responsive viewport matrix
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
  console.log('🧪 Starting Universal Responsive Automation Test Suite for SOMEWHERE...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage();

  // Test results tracker
  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n🔍 Testing [${vp.category}]: ${vp.width}x${vp.height} (${vp.name})...`);
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    // Let R3F canvas and camera finish adaptive framing
    await new Promise(r => setTimeout(r, 1200));

    // Audit viewport DOM for responsive requirements
    const audit = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;

      // 1. Horizontal overflow check
      const hasHorizontalOverflow = docW > winW;

      // 2. Vertical overflow check
      const hasVerticalOverflow = docH > winH + 2;

      // 3. Welcome lines visibility
      const welcomeLines = Array.from(document.querySelectorAll('.welcome-line'));
      const welcomeTexts = welcomeLines.map(el => el.textContent?.trim());
      const welcomeRects = welcomeLines.map(el => el.getBoundingClientRect());
      const welcomeInBounds = welcomeRects.every(r => r.left >= 0 && r.right <= winW && r.top >= 0 && r.bottom <= winH);

      // 4. ENTER Button visibility & bounds
      const enterBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('ENTER'));
      let enterBtnValid = false;
      let enterRect = null;
      if (enterBtn) {
        const r = enterBtn.getBoundingClientRect();
        enterRect = { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height };
        enterBtnValid = r.width >= 40 && r.height >= 38 && r.left >= 0 && r.right <= winW && r.bottom <= winH && r.top >= 0;
      }

      // 5. Header Badge and Atmosphere Controls overlap check
      const badge = document.querySelector('[data-testid="milestone-badge"]');
      const atmoControls = document.querySelector('[data-testid="atmosphere-controls"]');
      let headerCollision = false;
      if (badge && atmoControls) {
        const bRect = badge.getBoundingClientRect();
        const aRect = atmoControls.getBoundingClientRect();
        // Check if bounding boxes horizontally intersect
        headerCollision = !(bRect.right <= aRect.left || bRect.left >= aRect.right || bRect.bottom <= aRect.top || bRect.top >= aRect.bottom);
      }

      // 6. 3D Canvas dimension check
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
        welcomeInBounds,
        enterBtnValid,
        enterRect,
        headerCollision,
        canvasValid,
      };
    });

    const passed = !audit.hasHorizontalOverflow && !audit.hasVerticalOverflow && audit.welcomeInBounds && audit.enterBtnValid && !audit.headerCollision;

    const screenshotPath = path.join(SCREENSHOT_DIR, `${vp.name}.png`);
    await page.screenshot({ path: screenshotPath });

    results.push({
      ...vp,
      passed,
      audit,
      screenshot: `${vp.name}.png`
    });

    if (passed) {
      console.log(`  ✅ PASS: Framed, No overflow (W:${audit.winW} H:${audit.winH}), No collision, ENTER accessible`);
    } else {
      console.error(`  ❌ FAIL:`, {
        overflow: audit.hasHorizontalOverflow,
        welcomeInBounds: audit.welcomeInBounds,
        enterBtnValid: audit.enterBtnValid,
        headerCollision: audit.headerCollision
      });
    }
  }

  // 17. Test Orientation Change simulation (resize from 390x844 portrait to 844x390 landscape on the same page)
  console.log('\n🔄 Testing Live Orientation Flip (390x844 portrait -> 844x390 landscape)...');
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 600));
  await page.setViewport({ width: 844, height: 390 });
  await new Promise(r => setTimeout(r, 1000));
  const flipAudit = await page.evaluate(() => {
    return {
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      canvasWidth: document.querySelector('canvas')?.clientWidth,
      innerWidth: window.innerWidth
    };
  });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '17_orientation_flip_landscape.png') });
  console.log('  Orientation flip audit:', flipAudit);

  // 18. Test Reduced Motion
  console.log('\n♿ Testing prefers-reduced-motion media feature...');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '18_reduced_motion.png') });
  console.log('  Reduced motion screenshot captured.');

  await browser.close();

  // Summary
  console.log('\n========================================');
  console.log('📊 RESPONSIVE TESTING SUMMARY');
  console.log('========================================');
  const allPassed = results.every(r => r.passed);
  console.log(`Total Viewports Tested: ${results.length}`);
  console.log(`Passed: ${results.filter(r => r.passed).length} / ${results.length}`);
  console.log(`Result: ${allPassed ? 'ALL VIEWPORTS PASSED! 🎉' : 'SOME TESTS FAILED'}`);

  return results;
}

runResponsiveTests().catch(err => {
  console.error('Test suite execution failed:', err);
  process.exit(1);
});
