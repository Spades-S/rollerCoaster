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

var Comment = function (_think$model$base) {
    (0, _inherits3.default)(Comment, _think$model$base);

    function Comment() {
        (0, _classCallCheck3.default)(this, Comment);
        return (0, _possibleConstructorReturn3.default)(this, (Comment.__proto__ || (0, _getPrototypeOf2.default)(Comment)).apply(this, arguments));
    }

    (0, _createClass3.default)(Comment, [{
        key: 'init',
        value: function init() {
            var _get2;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            (_get2 = (0, _get4.default)(Comment.prototype.__proto__ || (0, _getPrototypeOf2.default)(Comment.prototype), 'init', this)).call.apply(_get2, [this].concat(args));
            this.tableName = 'comment';
        }
    }, {
        key: 'addComment',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(userid, articleid, authorAvatar, authorName, content, timestamp) {
                var insertId;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return this.add({
                                    "authorId": userid,
                                    "authorAvatar": authorAvatar,
                                    "authorName": authorName,
                                    "postId": articleid,
                                    "content": content,
                                    "timestamp": timestamp
                                });

                            case 3:
                                insertId = _context.sent;
                                return _context.abrupt('return', insertId);

                            case 7:
                                _context.prev = 7;
                                _context.t0 = _context['catch'](0);

                                think.log('add user cause wrong ' + _context.t0);
                                return _context.abrupt('return', false);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 7]]);
            }));

            function addComment(_x, _x2, _x3, _x4, _x5, _x6) {
                return _ref.apply(this, arguments);
            }

            return addComment;
        }()
    }, {
        key: 'getCommentByPostId',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(postid) {
                var data;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.field('authorAvatar, authorName, content, timestamp').where({ postid: postid }).select();

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

            function getCommentByPostId(_x7) {
                return _ref2.apply(this, arguments);
            }

            return getCommentByPostId;
        }()
    }, {
        key: 'getPerPageComments',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(postId, number, currentPage) {
                var data;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.field('authorAvatar, authorName, content, timestamp').order('id DESC').where({ postId: postId }).page(currentPage, number).countSelect();

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

            function getPerPageComments(_x8, _x9, _x10) {
                return _ref3.apply(this, arguments);
            }

            return getPerPageComments;
        }()
    }]);
    return Comment;
}(think.model.base);

exports.default = Comment;
//# sourceMappingURL=comment.js.map