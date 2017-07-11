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
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(number, currentPage) {
                var data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.order('updateTime DESC').where({ type: 0 }).page(currentPage, number).countSelect();

                            case 2:
                                data = _context.sent;
                                return _context.abrupt('return', data);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getPerPageItems(_x, _x2) {
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
                                return this.alias('article').field('title, authorAvatar, authorName, content, updatetime, likes').where({ id: id }).select();

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

            function getArticleItemByid(_x3) {
                return _ref2.apply(this, arguments);
            }

            return getArticleItemByid;
        }()
    }, {
        key: 'getAuthoridByArticleId',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(articleid) {
                var authorid;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.field('authorid').where({ id: articleid }).select();

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

            function getAuthoridByArticleId(_x4) {
                return _ref3.apply(this, arguments);
            }

            return getAuthoridByArticleId;
        }()
    }, {
        key: 'getRelativeArticlesByAuthorId',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(authorid, articleid) {
                var relativeArticles;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.field('id, title, description, poster').where({ authorid: authorid, id: ['!=', articleid], type: 0 }).select();

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

            function getRelativeArticlesByAuthorId(_x5, _x6) {
                return _ref4.apply(this, arguments);
            }

            return getRelativeArticlesByAuthorId;
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

            function updateLikesByArticleId(_x7, _x8) {
                return _ref5.apply(this, arguments);
            }

            return updateLikesByArticleId;
        }()
    }]);
    return Article;
}(think.model.base);

exports.default = Article;
//# sourceMappingURL=article.js.map