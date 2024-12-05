import { remote } from 'webdriverio';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const capabilities = {
  'tvlabs:constraints': {
    make: 'webos',
    model: 'webos',
    platform: 'webos',
    platformVersion: '10.0',
  },
};

const wdOpts = {
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

    const appInfo = await driver.executeScript('webos: activeAppInfo', []);
    console.log('appInfo', appInfo);
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
