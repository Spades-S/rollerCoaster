'use strict';

var thinkjs = require('thinkjs');
var path = require('path');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + path.sep + 'app',
  RUNTIME_PATH: rootPath + path.sep + 'runtime',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  env: 'production'
});
instance.compile({
  log: true,
  presets: [],
  plugins: []
});
instance.run(true);
//# sourceMappingURL=production.js.map