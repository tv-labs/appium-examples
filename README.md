# TV Labs Appium Examples

This repository contains example scripts demonstrating how to use Appium with the TV Labs platform for automated testing on various TV platforms.

## Prerequisites

- Node.js >= 22
- A TV Labs account and API key
- npm or yarn

## Setup

1. Clone this repository:

```bash
git clone https://github.com/tvlabs/appium-examples.git
cd appium-examples
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your TV Labs API key:

```bash
TVLABS_API_TOKEN=your_api_token_here
```

To get your API key:

1. Go to [https://tvlabs.ai/app/keys](https://tvlabs.ai/app/keys)
2. Click "Create New Key"
3. Give your key a name and copy the generated token
4. Paste the token in your `.env` file

![cli-api-key-list](/img/cli-api-key-list.png)
**Figure 2:** List of API keys.

## Running the Examples

The repository includes example scripts for different TV platforms:

```bash
# Run the Roku example
npm run roku

# Run the webOS example
npm run webos
```

## Platform Examples

### Roku Example

The Roku example (`test-roku.js`) demonstrates:

- Basic remote control operations
- Taking screenshots
- Getting device information
- Sideloading a dev channel (optional)

### webOS Example

The webOS example (`test-webos.js`) shows:

- Remote control operations
- Basic app navigation

## Device Constraints

TV Labs uses a constraint system to specify which device to use for testing. You can set various constraints in the capabilities object:

```javascript
const capabilities = {
  'tvlabs:constraints': {
    make: 'roku', // Device manufacturer (roku, webos, etc.)
    model: 'Express4K', // Specific model
    platform: 'roku', // Platform type
  },
};
```

Common constraint options:

- `make`: Device manufacturer (roku, webos, tizen, etc.)
- `model`: Specific model name
- `platform`: Platform type
- `platformVersion`: OS version (optional)

The platform will automatically select an available device that matches your constraints.

## WebDriverIO Configuration

The examples use WebDriverIO to connect to the TV Labs Appium server:

```javascript
const wdOpts = {
  hostname: 'appium.tvlabs.ai',
  port: 4723,
  headers: {
    Authorization: `Bearer ${process.env.TVLABS_API_TOKEN}`,
  },
  logLevel: 'info',
  capabilities,
};
```

## Remote Control Operations

```javascript
// Press keys on Roku
await driver.executeScript('roku: pressKey', [{ key: 'Up' }]);
await driver.executeScript('roku: pressKey', [{ key: 'Down' }]);

// Press keys on webOS
await driver.executeScript('webos: pressKey', [{ key: 'up' }]);
await driver.executeScript('webos: pressKey', [{ key: 'down' }]);
```

## Notes

- Screenshots are only available in the Roku dev channel
- Always remember to clean up your session using `driver.deleteSession()`
- The TV Labs platform handles device allocation based on your constraints

## License

ISC
