/**
 * Created by fuyazhou on 17/7/11.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$logic$base) {
	(0, _inherits3.default)(_class, _think$logic$base);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: 'indexAction',
		value: function indexAction() {}
	}, {
		key: 'getvfcodeAction',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var userModel, account, isExist;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!/verify/.test(this.header('Referer'))) {
									_context.next = 13;
									break;
								}

								userModel = this.model('user');
								account = this.post('account');
								_context.next = 5;
								return userModel.isExist(account);

							case 5:
								isExist = _context.sent;

								console.log(isExist);

								if (isExist) {
									_context.next = 11;
									break;
								}

								return _context.abrupt('return', this.fail('invalid account'));

							case 11:
								_context.next = 13;
								return this.session('reset', true);

							case 13:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getvfcodeAction() {
				return _ref.apply(this, arguments);
			}

			return getvfcodeAction;
		}()
	}, {
		key: 'verifycodeAction',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
				var sessionCode;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								this.allowMethods = 'get';
								_context2.next = 3;
								return this.session('code');

							case 3:
								sessionCode = _context2.sent;

								if (!(Number(this.get('code')) !== Number(sessionCode))) {
									_context2.next = 6;
									break;
								}

								return _context2.abrupt('return', this.fail('validate error', this.errors()));

							case 6:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function verifycodeAction() {
				return _ref2.apply(this, arguments);
			}

			return verifycodeAction;
		}()
	}, {
		key: 'passwordAction',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
				var code;
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.session('code');

							case 2:
								code = _context3.sent;

								console.log(code);

								if (code) {
									_context3.next = 6;
									break;
								}

								return _context3.abrupt('return', this.redirect('/user/index'));

							case 6:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function passwordAction() {
				return _ref3.apply(this, arguments);
			}

			return passwordAction;
		}()
	}, {
		key: 'registerAction',
		value: function () {
			var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
				return _regenerator2.default.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								if (!this.cookie('uid')) {
									_context4.next = 2;
									break;
								}

								return _context4.abrupt('return', this.redirect('/user/index'));

							case 2:
								this.allowMethods = 'get,post';

							case 3:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function registerAction() {
				return _ref4.apply(this, arguments);
			}

			return registerAction;
		}()
	}, {
		key: 'loginAction',
		value: function () {
			var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
				return _regenerator2.default.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								this.allowMethods = 'get';

							case 1:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function loginAction() {
				return _ref5.apply(this, arguments);
			}

			return loginAction;
		}()
	}, {
		key: 'loginintosystemAction',
		value: function () {
			var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
				return _regenerator2.default.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								this.allowMethods = 'post';

							case 1:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function loginintosystemAction() {
				return _ref6.apply(this, arguments);
			}

			return loginintosystemAction;
		}()
	}, {
		key: 'verifyAction',
		value: function () {
			var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
				return _regenerator2.default.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								if (!this.cookie('uid')) {
									_context7.next = 2;
									break;
								}

								return _context7.abrupt('return', this.redirect('/user/index'));

							case 2:
							case 'end':
								return _context7.stop();
						}
					}
				}, _callee7, this);
			}));

			function verifyAction() {
				return _ref7.apply(this, arguments);
			}

			return verifyAction;
		}()
	}, {
		key: 'resetAction',
		value: function () {
			var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
				var reset;
				return _regenerator2.default.wrap(function _callee8$(_context8) {
					while (1) {
						switch (_context8.prev = _context8.next) {
							case 0:
								_context8.next = 2;
								return this.session('reset');

							case 2:
								reset = _context8.sent;

								if (reset) {
									_context8.next = 5;
									break;
								}

								return _context8.abrupt('return', this.redirect('/user/index'));

							case 5:
							case 'end':
								return _context8.stop();
						}
					}
				}, _callee8, this);
			}));

			function resetAction() {
				return _ref8.apply(this, arguments);
			}

			return resetAction;
		}()
	}, {
		key: 'resetpasswordAction',
		value: function () {
			var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
				return _regenerator2.default.wrap(function _callee9$(_context9) {
					while (1) {
						switch (_context9.prev = _context9.next) {
							case 0:
								this.allowMethods = 'post';

							case 1:
							case 'end':
								return _context9.stop();
						}
					}
				}, _callee9, this);
			}));

			function resetpasswordAction() {
				return _ref9.apply(this, arguments);
			}

			return resetpasswordAction;
		}()
	}]);
	return _class;
}(think.logic.base);

exports.default = _class;
//# sourceMappingURL=user.js.map