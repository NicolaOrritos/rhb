var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'mac', 'Grapesjs.app', 'Contents', 'MacOS', 'Grapesjs');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'linux', 'Grapesjs');
      default:
        throw 'Unsupported platform';
    }
  }
};
