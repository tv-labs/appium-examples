// Downloaded from https://webostv.developer.lge.com/develop/tools/webos-tv-cli-installation, its the compatible version for the driver
// (cd webos_cli && tar -xzf <platform>.tgz)

import { remote } from 'webdriverio';

const capabilities = {
  'tvlabs:constraints': {
    make: 'webos',
    model: 'webos',
    platform: 'webos',
    platformVersion: '10.0',
  },
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  headers: {
    Authorization: 'Bearer tv-DPhCUQxw1XadtCDAGrPmucKNrwdbpn4owiAq0Q5DgaQ',
  },
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);

  try {
    // Wait for the app to launch. Appears to be required for RC only mode, since it doesn't know when the app is ready.
    // await driver.pause(5000);

    await driver.executeScript('webos: pressKey', [{ key: 'up' }]);

    await driver.pause(1000);

    await driver.executeScript('webos: pressKey', [{ key: 'down' }]);

    await driver.pause(1000);

    await driver.executeScript('webos: pressKey', [{ key: 'down' }]);

    await driver.pause(1000);
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
