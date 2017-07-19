'use strict';

/**
 * session configs
 */
export default {
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
      path: think.RUNTIME_PATH + '/session',
    }
  }
};