'use strict';

/**
 * session configs
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'thinkjs',
  type: 'file',
  secret: 'W4S6R31C',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session'
    }
  }
};
//# sourceMappingURL=session.js.map