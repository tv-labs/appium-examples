import { remote } from 'webdriverio';
import dotenv from 'dotenv';

dotenv.config();

const capabilities = {
  // 'tvlabs:host': 'tv-1420923016633.tail23398.ts.net,
  'tvlabs:constraints': {
    make: 'LG',
    model: 'C4AUA',
    platform_key: 'webos',
  },
  // Include to sideload a dev channel (required)
  'appium:app': '/home/appium/server/apps/webos.ipk',
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
    // Wait for the app to launch. Appears to be required for RC only mode,
    //since it doesn't know when the app is ready.
    // await driver.pause(5000);

    await driver.executeScript('webos: pressKey', [{ key: 'up' }]);
    await driver.pause(500);
    await driver.executeScript('webos: pressKey', [{ key: 'down' }]);
    await driver.pause(500);
    await driver.executeScript('webos: pressKey', [{ key: 'down' }]);
    await driver.pause(500);
    await driver.executeScript('webos: activeAppInfo', []);
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
