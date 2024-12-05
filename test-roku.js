import { remote } from 'webdriverio';
import fs from 'fs';

const capabilities = {
  'tvlabs:filter': 'B',
  'appium:app': '/home/appium/server/apps/roku.zip', // Optional: Include to sideload a dev channel
};

const wdOpts = {
  hostname: 'localhost',
  port: 4723, // Appium proxy
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
