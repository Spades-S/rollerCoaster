/**
 * Created by fuyazhou on 17/7/26.
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

var _base2 = require('./base');

var _base3 = _interopRequireDefault(_base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_base) {
	(0, _inherits3.default)(_class, _base);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: 'indexAction',
		value: function indexAction() {
			this.display('discovery/index.html');
		}
	}, {
		key: 'getfacilityAction',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var cat, count, page, facilityModel, res;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								cat = this.get('cat');
								count = this.get('count');
								page = this.get('page');
								facilityModel = this.model('facility');
								_context.next = 6;
								return facilityModel.getFacility(cat, count, page);

							case 6:
								res = _context.sent;

								if (!think.isEmpty(res)) {
									_context.next = 9;
									break;
								}

								return _context.abrupt('return', this.success('no more facility'));

							case 9:
								return _context.abrupt('return', this.success(res));

							case 10:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getfacilityAction() {
				return _ref.apply(this, arguments);
			}

			return getfacilityAction;
		}()
	}]);
	return _class;
}(_base3.default);

exports.default = _class;
//# sourceMappingURL=discovery.js.map