var exec = require("cordova/exec");

/**
 * Enable privacy screen (prevents screenshots and task switcher previews)
 * @param {Function} success - Success callback
 * @param {Function} error - Error callback
 */
exports.enable = function (success, error) {
  exec(success, error, "PrivacyScreenPlugin", "enable", []);
};

/**
 * Disable privacy screen (allows screenshots and task switcher previews)
 * @param {Function} success - Success callback
 * @param {Function} error - Error callback
 */
exports.disable = function (success, error) {
  exec(success, error, "PrivacyScreenPlugin", "disable", []);
};

// Expose plugin globally for easier access
module.exports = exports;
