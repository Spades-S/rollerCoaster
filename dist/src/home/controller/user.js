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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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
            if (checkLogin(this)) {
                this.assign('uid', this.cookie('uid'));
                return this.display('user/index.html');
            } else {
                return this.redirect('/user/login');
            }
        }
    }, {
        key: 'agreementAction',
        value: function agreementAction() {
            return this.display('user/agreement.html');
        }
    }, {
        key: 'likeAction',
        value: function likeAction() {
            return this.display('user/like.html');
        }
    }, {
        key: 'getlikesAction',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var uid, userModel, articleModel, likeArticleIdsRowData, likeArticleIds, likeArticles;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                uid = this.cookie('uid');
                                userModel = this.model('user');
                                articleModel = this.model('article');
                                _context.next = 5;
                                return userModel.getLikes(uid);

                            case 5:
                                likeArticleIdsRowData = _context.sent;
                                likeArticleIds = JSON.parse(likeArticleIdsRowData[0].likes);
                                _context.next = 9;
                                return articleModel.getLikeArticles(likeArticleIds);

                            case 9:
                                likeArticles = _context.sent;
                                return _context.abrupt('return', this.success(likeArticles));

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getlikesAction() {
                return _ref.apply(this, arguments);
            }

            return getlikesAction;
        }()
    }, {
        key: 'canclelikeAction',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                var articleid, uid, userModel, lines;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                articleid = this.post('articleid');

                                console.log(articleid);
                                uid = this.cookie('uid');
                                userModel = this.model('user');
                                _context2.next = 6;
                                return userModel.updateLikes(parseInt(articleid), uid);

                            case 6:
                                lines = _context2.sent;
                                return _context2.abrupt('return', this.success(lines));

                            case 8:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function canclelikeAction() {
                return _ref2.apply(this, arguments);
            }

            return canclelikeAction;
        }()
    }, {
        key: 'registerAction',
        value: function registerAction() {
            return this.display('user/register.html');
        }
    }, {
        key: 'getvfcodeAction',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                var account, code, sessionCode;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                account = this.post('account');
                                code = generateVerificationCode();
                                // let userModel = this.model('user')
                                // let send_res = await userModel.sendMessage(phone, code)

                                _context3.next = 5;
                                return this.session('account', account);

                            case 5:
                                _context3.next = 7;
                                return this.session('code', Number(code));

                            case 7:
                                _context3.next = 9;
                                return this.session('code');

                            case 9:
                                sessionCode = _context3.sent;

                                console.log(sessionCode);

                                return _context3.abrupt('return', this.success(true));

                            case 14:
                                _context3.prev = 14;
                                _context3.t0 = _context3['catch'](0);
                                return _context3.abrupt('return', this.fail(_context3.t0, this.errors()));

                            case 17:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 14]]);
            }));

            function getvfcodeAction() {
                return _ref3.apply(this, arguments);
            }

            return getvfcodeAction;
        }()
    }, {
        key: 'verifycodeAction',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                return _context4.abrupt('return', this.success('successfully verified'));

                            case 1:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function verifycodeAction() {
                return _ref4.apply(this, arguments);
            }

            return verifycodeAction;
        }()
    }, {
        key: 'passwordAction',
        value: function () {
            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (!checkLogin(this)) {
                                    _context5.next = 4;
                                    break;
                                }

                                return _context5.abrupt('return', this.redirect('index'));

                            case 4:
                                return _context5.abrupt('return', this.display('user/password.html'));

                            case 5:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function passwordAction() {
                return _ref5.apply(this, arguments);
            }

            return passwordAction;
        }()
    }, {
        key: 'registerinAction',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
                var phone, nickname, psd, userModel, ck, data;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.prev = 0;
                                _context6.next = 3;
                                return this.session('account');

                            case 3:
                                phone = _context6.sent;
                                nickname = this.post('nickname');
                                psd = this.post('psd');
                                userModel = this.model('user');
                                ck = generateUid();
                                _context6.next = 10;
                                return userModel.register(phone, nickname, psd, ck);

                            case 10:
                                data = _context6.sent;


                                this.cookie('uid', ck);
                                console.log(data);

                                return _context6.abrupt('return', this.success(data));

                            case 16:
                                _context6.prev = 16;
                                _context6.t0 = _context6['catch'](0);
                                return _context6.abrupt('return', this.fail(_context6.t0));

                            case 19:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[0, 16]]);
            }));

            function registerinAction() {
                return _ref6.apply(this, arguments);
            }

            return registerinAction;
        }()
    }, {
        key: 'loginAction',
        value: function () {
            var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
                var uid;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                uid = this.cookie('uid');

                                if (!uid) {
                                    _context7.next = 3;
                                    break;
                                }

                                return _context7.abrupt('return', this.redirect('/user/index'));

                            case 3:
                                return _context7.abrupt('return', this.display('user/login.html'));

                            case 4:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function loginAction() {
                return _ref7.apply(this, arguments);
            }

            return loginAction;
        }()
    }, {
        key: 'logintosystemAction',
        value: function () {
            var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
                var account, psd, userModel, ck, loginRes, isEmpty;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                account = this.post('account');
                                psd = this.post('psd');
                                userModel = this.model('user');
                                ck = generateUid();
                                _context8.next = 6;
                                return userModel.logIntoSystem(account, psd, ck);

                            case 6:
                                loginRes = _context8.sent;
                                isEmpty = think.isEmpty(loginRes);


                                console.log(isEmpty);

                                if (isEmpty) {
                                    _context8.next = 14;
                                    break;
                                }

                                this.cookie('uid', ck);
                                return _context8.abrupt('return', this.success(loginRes));

                            case 14:
                                return _context8.abrupt('return', this.fail('login error'));

                            case 15:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function logintosystemAction() {
                return _ref8.apply(this, arguments);
            }

            return logintosystemAction;
        }()
    }, {
        key: 'getuserinfoAction',
        value: function () {
            var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
                var uid, userModel, userInfo;
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.prev = 0;
                                uid = this.cookie('uid');
                                userModel = this.model('user');
                                _context9.next = 5;
                                return userModel.getUserInfo(uid);

                            case 5:
                                userInfo = _context9.sent;

                                console.log(userInfo);

                                if (think.isEmpty(userInfo)) {
                                    _context9.next = 11;
                                    break;
                                }

                                return _context9.abrupt('return', this.success(userInfo));

                            case 11:
                                _context9.next = 13;
                                return this.cookie('uid', null);

                            case 13:
                                return _context9.abrupt('return', this.fail('invalid uid'));

                            case 14:
                                _context9.next = 21;
                                break;

                            case 16:
                                _context9.prev = 16;
                                _context9.t0 = _context9['catch'](0);
                                _context9.next = 20;
                                return this.cookie('uid', null);

                            case 20:
                                return _context9.abrupt('return', this.fail('invalid uid'));

                            case 21:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this, [[0, 16]]);
            }));

            function getuserinfoAction() {
                return _ref9.apply(this, arguments);
            }

            return getuserinfoAction;
        }()
    }, {
        key: 'detailAction',
        value: function () {
            var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10() {
                return _regenerator2.default.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                return _context10.abrupt('return', this.display('user/detail.html'));

                            case 1:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function detailAction() {
                return _ref10.apply(this, arguments);
            }

            return detailAction;
        }()
    }, {
        key: 'getuserdetailAction',
        value: function () {
            var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11() {
                var uid, userModel, userDetail;
                return _regenerator2.default.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                uid = this.cookie('uid');
                                userModel = this.model('user');
                                _context11.next = 4;
                                return userModel.getUserDetail(uid);

                            case 4:
                                userDetail = _context11.sent;

                                if (think.isEmpty(userDetail)) {
                                    _context11.next = 9;
                                    break;
                                }

                                return _context11.abrupt('return', this.success(userDetail));

                            case 9:
                                this.cookie('uid', null);
                                return _context11.abrupt('return', this.fail('invalid uid'));

                            case 11:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function getuserdetailAction() {
                return _ref11.apply(this, arguments);
            }

            return getuserdetailAction;
        }()
    }, {
        key: 'editAction',
        value: function () {
            var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12() {
                return _regenerator2.default.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                return _context12.abrupt('return', this.display('user/edit.html'));

                            case 1:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function editAction() {
                return _ref12.apply(this, arguments);
            }

            return editAction;
        }()
    }, {
        key: 'updateuserdetailAction',
        value: function () {
            var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee13() {
                var avatarCropped, avatarBase64, avatarBinary, userModel, uid, userRowData, basePath, detailPath, userDetail, updateRes;
                return _regenerator2.default.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                avatarCropped = this.post('avatarCropped');
                                avatarBase64 = avatarCropped.split(',')[1];
                                avatarBinary = new Buffer(avatarBase64, 'base64').toString('binary');
                                userModel = this.model('user');
                                uid = this.cookie('uid');
                                _context13.next = 7;
                                return userModel.getUserInfo(uid);

                            case 7:
                                userRowData = _context13.sent;
                                basePath = this.config('avatarBasePath');
                                detailPath = '/avatar/' + userRowData.id + '.png';

                                _fs2.default.writeFileSync(basePath + detailPath, avatarBinary, 'binary', function (err) {
                                    console.log(err);
                                });
                                userDetail = {
                                    nickname: this.post('nickname'),
                                    avatar: detailPath,
                                    gender: this.post('gender'),
                                    birth: this.post('birth'),
                                    mail: this.post('mail'),
                                    introduction: this.post('introduction'),
                                    city: this.post('city')
                                };

                                console.log(userDetail);

                                _context13.next = 15;
                                return userModel.updateUserDetail(userDetail, uid);

                            case 15:
                                updateRes = _context13.sent;

                                if (think.isEmpty(updateRes)) {
                                    _context13.next = 20;
                                    break;
                                }

                                return _context13.abrupt('return', this.success('successfully update'));

                            case 20:
                                return _context13.abrupt('return', this.fail('update failed'));

                            case 21:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, this);
            }));

            function updateuserdetailAction() {
                return _ref13.apply(this, arguments);
            }

            return updateuserdetailAction;
        }()
    }, {
        key: 'verifyAction',
        value: function () {
            var _ref14 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee14() {
                return _regenerator2.default.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                return _context14.abrupt('return', this.display('user/verify.html'));

                            case 1:
                            case 'end':
                                return _context14.stop();
                        }
                    }
                }, _callee14, this);
            }));

            function verifyAction() {
                return _ref14.apply(this, arguments);
            }

            return verifyAction;
        }()
    }, {
        key: 'resetAction',
        value: function () {
            var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee15() {
                return _regenerator2.default.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                _context15.t0 = console;
                                _context15.next = 3;
                                return this.session('account');

                            case 3:
                                _context15.t1 = _context15.sent;

                                _context15.t0.log.call(_context15.t0, _context15.t1);

                                _context15.t2 = console;
                                _context15.next = 8;
                                return this.session('reset');

                            case 8:
                                _context15.t3 = _context15.sent;

                                _context15.t2.log.call(_context15.t2, _context15.t3);

                                return _context15.abrupt('return', this.display('user/reset.html'));

                            case 11:
                            case 'end':
                                return _context15.stop();
                        }
                    }
                }, _callee15, this);
            }));

            function resetAction() {
                return _ref15.apply(this, arguments);
            }

            return resetAction;
        }()
    }, {
        key: 'resetpasswordAction',
        value: function () {
            var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee16() {
                var account, psd, userModel, updateRes;
                return _regenerator2.default.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                _context16.next = 2;
                                return this.session('account');

                            case 2:
                                account = _context16.sent;
                                psd = this.post('psd');
                                userModel = this.model('user');
                                _context16.next = 7;
                                return userModel.resetPassword(account, psd);

                            case 7:
                                updateRes = _context16.sent;
                                _context16.next = 10;
                                return this.session('reset', false);

                            case 10:
                                if (think.isEmpty(updateRes)) {
                                    _context16.next = 14;
                                    break;
                                }

                                return _context16.abrupt('return', this.success('successfully update'));

                            case 14:
                                return _context16.abrupt('return', this.fail('update failed'));

                            case 15:
                            case 'end':
                                return _context16.stop();
                        }
                    }
                }, _callee16, this);
            }));

            function resetpasswordAction() {
                return _ref16.apply(this, arguments);
            }

            return resetpasswordAction;
        }()
    }]);
    return _class;
}(_base3.default);

exports.default = _class;
//# sourceMappingURL=user.js.map