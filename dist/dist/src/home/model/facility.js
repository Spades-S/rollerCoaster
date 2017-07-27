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

var _get3 = require('babel-runtime/helpers/get');

var _get4 = _interopRequireDefault(_get3);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var Facility = function (_think$model$base) {
	(0, _inherits3.default)(Facility, _think$model$base);

	function Facility() {
		(0, _classCallCheck3.default)(this, Facility);
		return (0, _possibleConstructorReturn3.default)(this, (Facility.__proto__ || (0, _getPrototypeOf2.default)(Facility)).apply(this, arguments));
	}

	(0, _createClass3.default)(Facility, [{
		key: 'init',
		value: function init() {
			var _get2;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			(_get2 = (0, _get4.default)(Facility.prototype.__proto__ || (0, _getPrototypeOf2.default)(Facility.prototype), 'init', this)).call.apply(_get2, [this].concat(args));
			this.tableName = 'facility';
		}
	}, {
		key: 'getFacility',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(cat, count, page) {
				var res;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.field('title, poster, rating, price, geolocation').where({ category: cat }).page(page, count).countSelect();

							case 2:
								res = _context.sent;
								return _context.abrupt('return', res);

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getFacility(_x, _x2, _x3) {
				return _ref.apply(this, arguments);
			}

			return getFacility;
		}()
	}]);
	return Facility;
}(think.model.base);

exports.default = Facility;
//# sourceMappingURL=facility.js.map
//# sourceMappingURL=facility.js.map