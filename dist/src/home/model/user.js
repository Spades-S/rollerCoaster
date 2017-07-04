'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$model$base) {
    (0, _inherits3.default)(_class, _think$model$base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
        key: 'init',
        value: function init() {
            var _get2;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            (_get2 = (0, _get4.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), 'init', this)).call.apply(_get2, [this].concat(args));
            this.tableName = 'user';
        }
    }, {
        key: 'updateLikes',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(articleid) {
                var data, newLikes, likedata, oldLikes, index, lines;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.field('likes').where({ id: 1 }).select();

                            case 2:
                                data = _context.sent;
                                newLikes = void 0;

                                if (data[0].likes == "") {
                                    likedata = new Array();

                                    likedata.push(articleid);
                                    newLikes = (0, _stringify2.default)(likedata);
                                } else {
                                    oldLikes = JSON.parse(data[0].likes);
                                    index = oldLikes.indexOf(articleid);

                                    if (index >= 0) {
                                        oldLikes.splice(index, 1);
                                    } else {
                                        oldLikes.push(articleid);
                                    }
                                    newLikes = (0, _stringify2.default)(oldLikes);
                                }
                                _context.next = 7;
                                return this.where({ id: 1 }).update({ likes: newLikes });

                            case 7:
                                lines = _context.sent;
                                return _context.abrupt('return', lines);

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function updateLikes(_x) {
                return _ref.apply(this, arguments);
            }

            return updateLikes;
        }()
    }, {
        key: 'getLikes',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                var data;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.field('likes').where({ id: 1 }).select();

                            case 2:
                                data = _context2.sent;
                                return _context2.abrupt('return', data);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getLikes() {
                return _ref2.apply(this, arguments);
            }

            return getLikes;
        }()
    }, {
        key: 'getAvatarInfoByUserId',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(id) {
                var data;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.field('avatar, nickname').where({ id: id }).select();

                            case 2:
                                data = _context3.sent;
                                return _context3.abrupt('return', data);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getAvatarInfoByUserId(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getAvatarInfoByUserId;
        }()
    }]);
    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=user.js.map