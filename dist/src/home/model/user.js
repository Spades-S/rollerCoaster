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

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

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
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(articleid, uid) {
                var data, newLikes, likedata, oldLikes, index, lines;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.field('likes').where({ uid: uid }).select();

                            case 2:
                                data = _context.sent;
                                newLikes = void 0;

                                if (data[0].likes == null) {
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
                                return this.where({ uid: uid }).update({ likes: newLikes });

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

            function updateLikes(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return updateLikes;
        }()
    }, {
        key: 'getLikes',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(uid) {
                var data;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.field('likes').where({ uid: uid }).select();

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

            function getLikes(_x3) {
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

            function getAvatarInfoByUserId(_x4) {
                return _ref3.apply(this, arguments);
            }

            return getAvatarInfoByUserId;
        }()
    }, {
        key: 'sendMessage',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(phone, code) {
                var send_res;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return (0, _requestPromise2.default)({
                                    url: 'https://sms.yunpian.com/v2/sms/single_send.json',
                                    method: 'POST',
                                    form: {
                                        apikey: 'dbbbda824548a83c9976e721ddbf4cb8',
                                        mobile: phone,
                                        text: code + '(欢乐冶手机验证码，请完成验证)，如非本人操作，请忽略本短信'
                                    }
                                });

                            case 3:
                                send_res = _context4.sent;
                                return _context4.abrupt('return', send_res);

                            case 7:
                                _context4.prev = 7;
                                _context4.t0 = _context4['catch'](0);
                                return _context4.abrupt('return', _context4.t0);

                            case 10:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 7]]);
            }));

            function sendMessage(_x5, _x6) {
                return _ref4.apply(this, arguments);
            }

            return sendMessage;
        }()
    }, {
        key: 'register',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(phone, nickname, psd, uid) {
                var sha1, newPsd, id;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                sha1 = _crypto2.default.createHash('sha1');

                                sha1.update(psd);
                                newPsd = sha1.digest('hex');
                                _context5.next = 5;
                                return this.add({
                                    nickname: nickname,
                                    password: newPsd,
                                    phoneNumber: phone,
                                    uid: uid
                                });

                            case 5:
                                id = _context5.sent;
                                return _context5.abrupt('return', id);

                            case 7:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function register(_x7, _x8, _x9, _x10) {
                return _ref5.apply(this, arguments);
            }

            return register;
        }()
    }, {
        key: 'logIntoSystem',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(account, psd, ck) {
                var sha1, psdencrypted, res;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                sha1 = _crypto2.default.createHash('sha1');

                                sha1.update(psd);
                                psdencrypted = sha1.digest('hex');
                                res = void 0;

                                if (!/^\d{11}$/.test(account)) {
                                    _context6.next = 10;
                                    break;
                                }

                                _context6.next = 7;
                                return this.where({ phoneNumber: account, password: psdencrypted }).update({ uid: ck });

                            case 7:
                                res = _context6.sent;
                                _context6.next = 13;
                                break;

                            case 10:
                                _context6.next = 12;
                                return this.where({ nickname: account, password: psdencrypted }).update({ uid: ck });

                            case 12:
                                res = _context6.sent;

                            case 13:
                                return _context6.abrupt('return', res);

                            case 14:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function logIntoSystem(_x11, _x12, _x13) {
                return _ref6.apply(this, arguments);
            }

            return logIntoSystem;
        }()
    }, {
        key: 'getUserInfo',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(uid) {
                var userInfo;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.field('id,nickname, avatar').where({ uid: uid }).find();

                            case 2:
                                userInfo = _context7.sent;
                                return _context7.abrupt('return', userInfo);

                            case 4:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function getUserInfo(_x14) {
                return _ref7.apply(this, arguments);
            }

            return getUserInfo;
        }()
    }, {
        key: 'getUserDetail',
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(uid) {
                var userDetail;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return this.field('nickname, avatar, gender, birth, mail, city, introduction').where({ uid: uid }).find();

                            case 2:
                                userDetail = _context8.sent;
                                return _context8.abrupt('return', userDetail);

                            case 4:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function getUserDetail(_x15) {
                return _ref8.apply(this, arguments);
            }

            return getUserDetail;
        }()
    }, {
        key: 'updateUserDetail',
        value: function () {
            var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(detail, uid) {
                var updateRes;
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return this.where({ uid: uid }).update({
                                    nickname: detail.nickname,
                                    avatar: detail.avatar,
                                    gender: detail.gender,
                                    birth: detail.birth,
                                    mail: detail.mail,
                                    city: detail.city,
                                    introduction: detail.introduction
                                });

                            case 2:
                                updateRes = _context9.sent;
                                return _context9.abrupt('return', updateRes);

                            case 4:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function updateUserDetail(_x16, _x17) {
                return _ref9.apply(this, arguments);
            }

            return updateUserDetail;
        }()
    }, {
        key: 'resetPassword',
        value: function () {
            var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(account, psd) {
                var sha1, newPsd, updateRes;
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                sha1 = _crypto2.default.createHash('sha1');

                                sha1.update(psd);
                                newPsd = sha1.digest('hex');
                                _context10.next = 5;
                                return this.where({ phoneNumber: account }).update({ password: newPsd });

                            case 5:
                                updateRes = _context10.sent;
                                return _context10.abrupt('return', updateRes);

                            case 7:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function resetPassword(_x18, _x19) {
                return _ref10.apply(this, arguments);
            }

            return resetPassword;
        }()
    }, {
        key: 'isPhoneNumExist',
        value: function () {
            var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(account) {
                var res;
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _context11.next = 2;
                                return this.where({ phoneNumber: account }).find();

                            case 2:
                                res = _context11.sent;

                                if (!think.isEmpty(res)) {
                                    _context11.next = 7;
                                    break;
                                }

                                return _context11.abrupt('return', false);

                            case 7:
                                return _context11.abrupt('return', true);

                            case 8:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function isPhoneNumExist(_x20) {
                return _ref11.apply(this, arguments);
            }

            return isPhoneNumExist;
        }()
    }, {
        key: 'isNickNameExist',
        value: function () {
            var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(nickName) {
                var res;
                return _regenerator2.default.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                _context12.next = 2;
                                return this.where({ nickname: nickName }).find();

                            case 2:
                                res = _context12.sent;

                                if (!think.isEmpty(res)) {
                                    _context12.next = 7;
                                    break;
                                }

                                return _context12.abrupt('return', false);

                            case 7:
                                return _context12.abrupt('return', true);

                            case 8:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function isNickNameExist(_x21) {
                return _ref12.apply(this, arguments);
            }

            return isNickNameExist;
        }()
    }]);
    return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=user.js.map