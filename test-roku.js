import { remote } from 'webdriverio';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const capabilities = {
  // 'tvlabs:host': 'stb-1422324336997.tail23398.ts.net', // B
  'tvlabs:constraints': {
    // make: 'roku',
    // model: 'Express4K',
    platform_key: 'roku',
    // year: '2023',
  },
  // Optional: Include to sideload a dev channel
  'appium:app': '/home/appium/server/apps/roku.zip',
};

const wdOpts = {
  protocol: 'https',
  hostname: 'appium.tvlabs.ai',
  port: 4723,
  headers: {
    Authorization: `Bearer ${process.env.TVLABS_API_TOKEN}`,
  },
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);

  try {
    await driver.executeScript('roku: deviceInfo', []);
    await driver.executeScript('roku: pressKey', [{ key: 'Up' }]);
    await driver.executeScript('roku: pressKey', [{ key: 'Down' }]);
    await driver.executeScript('roku: pressKey', [{ key: 'Left' }]);
    await driver.executeScript('roku: pressKey', [{ key: 'Right' }]);

    // Screenshots only work in the dev channel
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('./appium-screenshot.png', screenshot, {
      encoding: 'base64',
    });
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
