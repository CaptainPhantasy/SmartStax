const { withInfoPlist } = require('expo/config-plugins');

module.exports = function withIOSDeploymentTarget(config) {
  return withInfoPlist(config, (config) => {
    config.modResults.MinimumOSVersion = '13.4';
    return config;
  });
};