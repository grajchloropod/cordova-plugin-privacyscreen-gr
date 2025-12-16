# PrivacyScreenPlugin

Both iOS (as of iOS 7) and Android have app switchers that display a screenshot of your app.

This is a lovely feature for most apps, but if your app displays sensitive information this is a possible privacy risk.

This plugin flags your app so that it doesn't show your users' sensitive data in the task switcher. It sets the [FLAG_SECURE](http://developer.android.com/reference/android/view/WindowManager.LayoutParams.html#FLAG_SECURE) flag in Android (which also prevents manual screenshots from being taken) and hides the window in iOS.

On iOS this plugin will try to show your splashscreen in the app switcher. It will search for splashscreens prefixed by `Default` or the value of the key `UILaunchImageFile` in your .plist file.
If it fails to find a splashscreen for a specific device or orientation (portrait or landscape), a black screen is shown instead.

## What's New in This Fork

This fork adds programmatic control over the privacy screen feature:

- **`enable()`** - Enable privacy screen protection (prevents screenshots and task switcher previews)
- **`disable()`** - Disable privacy screen protection (allows screenshots and task switcher previews)

The plugin still enables privacy protection by default on app initialization (unless in debug mode), but now you can control it dynamically from your JavaScript code.

### Changes Made

1. **Android Implementation** (`src/android/PrivacyScreenPlugin.java`):

   - Added `execute()` method to handle JavaScript calls
   - Added `enablePrivacyScreen()` and `disablePrivacyScreen()` methods
   - Added Android platform configuration in `plugin.xml`

2. **JavaScript API** (`www/PrivacyScreenPlugin.js`):

   - Implemented `enable()` and `disable()` functions
   - Functions accept success and error callbacks

3. **Plugin Configuration** (`plugin.xml`):
   - Added Android platform configuration to properly register the plugin

## Installation

### From npm (Original Plugin)

```bash
cordova plugin add cordova-plugin-privacyscreen
```

### From Git Repository

```bash
https://github.com/grajchloropod/cordova-plugin-privacyscreen-gr
```

To remove the plugin:

```bash
cordova plugin remove cordova-plugin-privacyscreen
```

## Usage

### Automatic Mode (Default Behavior)

By default, the plugin automatically enables privacy protection when your app starts (unless running in debug mode). You don't need to do anything - just install the plugin.

### Programmatic Control (New Feature)

You can now enable or disable the privacy screen programmatically from your JavaScript code:

```javascript
// Wait for device ready
document.addEventListener(
  "deviceready",
  function () {
    // Enable privacy screen
    cordova.plugins.PrivacyScreenPlugin.enable(
      function () {
        console.log("Privacy screen enabled");
      },
      function (error) {
        console.error("Error enabling privacy screen:", error);
      }
    );

    // Disable privacy screen (e.g., for taking screenshots during development)
    cordova.plugins.PrivacyScreenPlugin.disable(
      function () {
        console.log("Privacy screen disabled");
      },
      function (error) {
        console.error("Error disabling privacy screen:", error);
      }
    );
  },
  false
);
```

### Example: Conditional Privacy Screen

You might want to disable privacy protection in certain scenarios:

```javascript
document.addEventListener(
  "deviceready",
  function () {
    // Disable privacy screen when showing a public screen
    function showPublicContent() {
      cordova.plugins.PrivacyScreenPlugin.disable(
        function () {
          /* Privacy disabled */
        },
        function (error) {
          console.error(error);
        }
      );
    }

    // Re-enable privacy screen when showing sensitive content
    function showSensitiveContent() {
      cordova.plugins.PrivacyScreenPlugin.enable(
        function () {
          /* Privacy enabled */
        },
        function (error) {
          console.error(error);
        }
      );
    }
  },
  false
);
```

### Testing

Test this plugin on a real device because the iOS simulator (7.1 at least) does a poor job hiding your app. On Android, you can verify it's working by:

1. Opening the app
2. Pressing the recent apps button (square button)
3. You should see a blank/black screen instead of your app content

## License

The MIT License

Copyright (c) 2016 Tommy-Carlos Williams (http://github.com/devgeeks)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
