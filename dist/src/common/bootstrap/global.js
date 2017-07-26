'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */

global.generateVerificationCode = function () {
	return Math.floor(Math.random() * 900000 + 100000);
};

global.generateUid = function () {
	var str = 'QWERTYUIOPLKJHGFDSAZXCVBNM123456789qwertyuioplkjhgfdsazxvcbnm';
	var ck = '';
	for (var i = 0; i < 18; i++) {
		ck += str.charAt(Math.floor(Math.random() * 61));
	}
	return ck;
};

global.checkLogin = function (_this) {
	if (_this.cookie('uid')) {
		return true;
	} else {
		return false;
	}
};

global.delayAction = function (timeout) {
	setTimeout(function () {
		return new _promise2.default(function (resolve) {
			resolve(true);
		});
	}, timeout);
};
//# sourceMappingURL=global.js.map