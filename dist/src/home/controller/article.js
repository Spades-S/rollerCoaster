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

var _base2 = require('./base.js');

var _base3 = _interopRequireDefault(_base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_base) {
    (0, _inherits3.default)(_class, _base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
        key: 'detailAction',
        value: function detailAction() {
            this.assign('articleid', this.get('articleid'));
            return this.display('article/detail.html');
        }
    }, {
        key: 'addcommentAction',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var userid, articleid, timestamp, content, userModel, authorInfo, authorAvatar, authorName, articleModel, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.isPost()) {
                                    _context.next = 16;
                                    break;
                                }

                                userid = this.post("userid");
                                articleid = this.post('articleid');
                                timestamp = this.post('timestamp');
                                content = this.post('content');
                                userModel = this.model('user');
                                _context.next = 8;
                                return userModel.getAvatarInfoByUserId(parseInt(userid));

                            case 8:
                                authorInfo = _context.sent;
                                authorAvatar = authorInfo[0].avatar;
                                authorName = authorInfo[0].nickname;
                                articleModel = this.model('comment');
                                _context.next = 14;
                                return articleModel.addComment(parseInt(userid), parseInt(articleid), authorAvatar, authorName, content, parseInt(timestamp));

                            case 14:
                                data = _context.sent;
                                return _context.abrupt('return', this.success(data));

                            case 16:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function addcommentAction() {
                return _ref.apply(this, arguments);
            }

            return addcommentAction;
        }()
    }, {
        key: 'refresharticlesAction',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                var currentPage, perPageNum, articleModel, data;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                currentPage = this.get('currentPage');
                                perPageNum = this.get('perPageNums');
                                articleModel = this.model('article');
                                _context2.next = 5;
                                return articleModel.getPerPageItems(currentPage, perPageNum);

                            case 5:
                                data = _context2.sent;
                                return _context2.abrupt('return', this.success(data));

                            case 7:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function refresharticlesAction() {
                return _ref2.apply(this, arguments);
            }

            return refresharticlesAction;
        }()
    }, {
        key: 'getarticlebyarticleidAction',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                var articleid, articleModel, data;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                articleid = this.get('articleid');
                                articleModel = this.model('article');
                                _context3.next = 4;
                                return articleModel.getArticleItemByid(articleid);

                            case 4:
                                data = _context3.sent;
                                return _context3.abrupt('return', this.success(data));

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getarticlebyarticleidAction() {
                return _ref3.apply(this, arguments);
            }

            return getarticlebyarticleidAction;
        }()
    }, {
        key: 'getrelativearticleAction',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
                var articleid, articleModel, authoridRowData, authorid, relativeArticles;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                articleid = this.get('articleid');
                                articleModel = this.model('article');
                                _context4.next = 4;
                                return articleModel.getAuthoridByArticleId(articleid);

                            case 4:
                                authoridRowData = _context4.sent;
                                authorid = authoridRowData[0].authorid;
                                _context4.next = 8;
                                return articleModel.getRelativeArticlesByAuthorId(authorid, articleid);

                            case 8:
                                relativeArticles = _context4.sent;

                                if (relativeArticles.length >= 2) {
                                    relativeArticles.slice(0, 2);
                                }
                                return _context4.abrupt('return', this.success(relativeArticles));

                            case 11:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function getrelativearticleAction() {
                return _ref4.apply(this, arguments);
            }

            return getrelativearticleAction;
        }()
    }, {
        key: 'refreshlikesAction',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
                var likes, articleid, articleModel, art_lines, userModel, data;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                likes = this.post('likes');
                                articleid = this.post('articleid');
                                articleModel = this.model('article');
                                _context5.next = 5;
                                return articleModel.updateLikesByArticleId(articleid, likes);

                            case 5:
                                art_lines = _context5.sent;
                                userModel = this.model('user');
                                _context5.next = 9;
                                return userModel.updateLikes(articleid);

                            case 9:
                                data = _context5.sent;
                                return _context5.abrupt('return', this.success(data));

                            case 11:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function refreshlikesAction() {
                return _ref5.apply(this, arguments);
            }

            return refreshlikesAction;
        }()
    }, {
        key: 'getlikestatusAction',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
                var articleid, userModel, rowdata, likes, data;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                articleid = this.get('articleid');
                                userModel = this.model('user');
                                _context6.next = 4;
                                return userModel.getLikes();

                            case 4:
                                rowdata = _context6.sent;
                                likes = JSON.parse(rowdata[0].likes);
                                data = void 0;

                                if (likes.indexOf(articleid) >= 0) {
                                    data = true;
                                } else {
                                    data = false;
                                }
                                return _context6.abrupt('return', this.success(data));

                            case 9:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function getlikestatusAction() {
                return _ref6.apply(this, arguments);
            }

            return getlikestatusAction;
        }()
    }, {
        key: 'getcommentbyarticleidAction',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
                var articleid, commentModel, comment, commentLength;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                articleid = this.get('articleid');
                                commentModel = this.model('comment');
                                _context7.next = 4;
                                return commentModel.getCommentByPostId(parseInt(articleid));

                            case 4:
                                comment = _context7.sent;
                                commentLength = comment.length;

                                if (commentLength >= 2) {
                                    comment.splice(0, 2);
                                }
                                return _context7.abrupt('return', this.success({ commentLength: commentLength, commentContent: comment }));

                            case 8:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function getcommentbyarticleidAction() {
                return _ref7.apply(this, arguments);
            }

            return getcommentbyarticleidAction;
        }()
    }]);
    return _class;
}(_base3.default);

exports.default = _class;
//# sourceMappingURL=article.js.map