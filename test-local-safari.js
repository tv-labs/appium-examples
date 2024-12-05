import { remote } from 'webdriverio';

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const wdOpts = {
  hostname: 'localhost',
  port: 4723, // Appium proxy
  logLevel: 'info',
  capabilities: {
    platformName: 'Mac',
    'appium:automationName': 'safari',
    'tvlabs:filter': 'X',
    // "tvlabs:filter": pickRandom(['X', 'Y', 'Z']),
  },
};

async function runTest() {
  const driver = await remote(wdOpts);

  try {
    await driver.navigateTo('https://tvlabs.ai/');
  } finally {
    await driver.pause(3000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
