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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Article = function (_think$model$base) {
    (0, _inherits3.default)(Article, _think$model$base);

    function Article() {
        (0, _classCallCheck3.default)(this, Article);
        return (0, _possibleConstructorReturn3.default)(this, (Article.__proto__ || (0, _getPrototypeOf2.default)(Article)).apply(this, arguments));
    }

    (0, _createClass3.default)(Article, [{
        key: 'init',
        value: function init() {
            var _get2;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            (_get2 = (0, _get4.default)(Article.prototype.__proto__ || (0, _getPrototypeOf2.default)(Article.prototype), 'init', this)).call.apply(_get2, [this].concat(args));
            this.tableName = 'article';
        }
    }, {
        key: 'getPerPageItems',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(number, currentPage, invisibleList) {
                var data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                data = void 0;

                                if (!(invisibleList.length === 0)) {
                                    _context.next = 7;
                                    break;
                                }

                                _context.next = 4;
                                return this.order('updateTime DESC').where({
                                    type: 0
                                }).page(currentPage, number).countSelect();

                            case 4:
                                data = _context.sent;
                                _context.next = 10;
                                break;

                            case 7:
                                _context.next = 9;
                                return this.order('updateTime DESC').where({
                                    type: 0,
                                    id: ['NOTIN', invisibleList]
                                }).page(currentPage, number).countSelect();

                            case 9:
                                data = _context.sent;

                            case 10:
                                return _context.abrupt('return', data);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getPerPageItems(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return getPerPageItems;
        }()
    }, {
        key: 'getArticleItemByid',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(id) {
                var data;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.alias('article').field('title, authorAvatar, authorName, content, updateTime, likes, col').where({ id: id }).select();

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

            function getArticleItemByid(_x4) {
                return _ref2.apply(this, arguments);
            }

            return getArticleItemByid;
        }()
    }, {
        key: 'getColByArticleId',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(articleid) {
                var authorid;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.field('col').where({ id: articleid }).select();

                            case 2:
                                authorid = _context3.sent;
                                return _context3.abrupt('return', authorid);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getColByArticleId(_x5) {
                return _ref3.apply(this, arguments);
            }

            return getColByArticleId;
        }()
    }, {
        key: 'getRelativeArticlesByCol',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(col, articleid) {
                var relativeArticles;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.field('id, title, description, poster').order('updateTime DESC').where({
                                    col: col,
                                    id: ['!=', articleid],
                                    type: 0
                                }).select();

                            case 2:
                                relativeArticles = _context4.sent;
                                return _context4.abrupt('return', relativeArticles);

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getRelativeArticlesByCol(_x6, _x7) {
                return _ref4.apply(this, arguments);
            }

            return getRelativeArticlesByCol;
        }()
    }, {
        key: 'updateLikesByArticleId',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(articleid, likes) {
                var lines;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.where({ id: articleid }).update({ likes: likes });

                            case 2:
                                lines = _context5.sent;
                                return _context5.abrupt('return', lines);

                            case 4:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function updateLikesByArticleId(_x8, _x9) {
                return _ref5.apply(this, arguments);
            }

            return updateLikesByArticleId;
        }()
    }, {
        key: 'getLikeArticles',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ids, currentPage, num) {
                var articles;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.field('id, title, poster, authorAvatar, authorName, col, description, updateTime').page(currentPage, num).where({ id: ['IN', ids] }).countSelect();

                            case 2:
                                articles = _context6.sent;
                                return _context6.abrupt('return', articles);

                            case 4:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getLikeArticles(_x10, _x11, _x12) {
                return _ref6.apply(this, arguments);
            }

            return getLikeArticles;
        }()
    }, {
        key: 'decreaseLikeNumber',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(id) {
                var data;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.where({ id: id }).decrement('likes');

                            case 2:
                                data = _context7.sent;
                                return _context7.abrupt('return', data);

                            case 4:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function decreaseLikeNumber(_x13) {
                return _ref7.apply(this, arguments);
            }

            return decreaseLikeNumber;
        }()
    }]);
    return Article;
}(think.model.base);

exports.default = Article;
//# sourceMappingURL=article.js.map