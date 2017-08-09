import base from './base.js';
import fs from 'fs';
export default class extends base {
    indexAction() {
        if (checkLogin(this)) {
            this.assign('uid', this.cookie('uid'))
            return this.display('user/index.html');
        } else {
            return this.redirect('/user/login')
        }
    }

    agreementAction() {
        return this.display('user/agreement.html')
    }

    likeAction() {
        return this.display('user/like.html');
    }

    async getlikesAction() {
        let uid = this.cookie('uid');
        let userModel = this.model('user');
        let articleModel = this.model('article');
        let likeArticleIdsRowData = await userModel.getLikes(uid);
        let likeArticleIds = JSON.parse(likeArticleIdsRowData[0].likes);
        if (likeArticleIds == null || likeArticleIds.length == 0) {
            return this.fail(1001, 'no likearticle!');
        }
        let currentPage = this.get('currentPage');
        let num = this.get('num');
        let likeArticles = await articleModel.getLikeArticles(likeArticleIds, currentPage, num);
        return this.success(likeArticles);
    }

    async canclelikeAction() {
        let articleid = this.post('articleid');
        console.log(articleid);
        let uid = this.cookie('uid');
        let userModel = this.model('user');
        let articleModel = this.model('article');
        await articleModel.decreaseLikeNumber(articleid);
        let lines = await userModel.updateLikes(parseInt(articleid), uid);
        return this.success(lines);
    }

    registerAction() {
        return this.display('user/register.html')
    }

    async getvfcodeAction() {
        try {

            let account = this.post('account')
            let code = generateVerificationCode();
            // let userModel = this.model('user')
            // let send_res = await userModel.sendMessage(phone, code)

            await this.session('account', account);
            await this.session('code', Number(code));


            let sessionCode = await this.session('code')
            console.log(sessionCode)

            return this.success(true)
            // this.success(send_res)

        } catch (err) {
            return this.fail(err, this.errors())
        }
    }

    async verifycodeAction() {
        return this.success('successfully verified')
    }

    async passwordAction() {
        if (checkLogin(this)) {
            return this.redirect('index')
        } else {
            return this.display('user/password.html')
        }
    }

    async registerinAction() {
        try {
            let phone = await this.session('account'),
                nickname = this.post('nickname'),
                psd = this.post('psd')
            let userModel = this.model('user')

            let ck = generateUid()
            let data = await userModel.register(phone, nickname, psd, ck)

            this.cookie('uid', ck)
            console.log(data)

            return this.success(data)
        } catch (err) {
            return this.fail(err)
        }
    }

    async loginAction() {
        let uid = this.cookie('uid')
        if (uid) {
            return this.redirect('/user/index')
        }
        return this.display('user/login.html')
    }

    async logintosystemAction() {
        let account = this.post('account')
        let psd = this.post('psd')
        let userModel = this.model('user')

        let ck = generateUid()
        let loginRes = await userModel.logIntoSystem(account, psd, ck)

        let isEmpty = think.isEmpty(loginRes)

        console.log(isEmpty)

        if (!isEmpty) {
            this.cookie('uid', ck)
            return this.success(loginRes)
        } else {
            return this.fail('login error')
        }
    }

    async getuserinfoAction() {
        try {
            let uid = this.cookie('uid')
            let userModel = this.model('user')
            let userInfo = await userModel.getUserInfo(uid)
            console.log(userInfo)
            if (!think.isEmpty(userInfo)) {
                return this.success(userInfo)
            } else {
                await this.cookie('uid', null)
                return this.fail('invalid uid')
            }
        } catch (err) {
            await this.cookie('uid', null)
            return this.fail('invalid uid')
        }
    }

    async detailAction() {
        return this.display('user/detail.html')
    }

    async getuserdetailAction() {
        let uid = this.cookie('uid')
        let userModel = this.model('user')
        let userDetail = await userModel.getUserDetail(uid)
        if (!think.isEmpty(userDetail)) {
            return this.success(userDetail)
        } else {
            this.cookie('uid', null)
            return this.fail('invalid uid')
        }
    }

    async editAction() {
        return this.display('user/edit.html')
    }

    async updateuserdetailAction() {
        let avatarCropped = this.post('avatarCropped');
        let userModel = this.model('user');
        let uid = this.cookie('uid');
        let userDetail = {
            nickname: this.post('nickname'),
            avatar: this.post('avatar'),
            gender: this.post('gender'),
            birth: this.post('birth'),
            mail: this.post('mail'),
            introduction: this.post('introduction'),
            city: this.post('city')
        }
        if (avatarCropped) {
            let avatarBase64 = avatarCropped.split(',')[1];
            let avatarBinary = new Buffer(avatarBase64, 'base64').toString('binary');
            let userRowData = await userModel.getUserInfo(uid);
            let basePath = this.config('avatarBasePath');
            let detailPath = '/avatar/' + userRowData.id + '.png';
            fs.writeFile(basePath + detailPath, avatarBinary, 'binary', function (err) {
                console.log(err);
            });
            userDetail.avatar = detailPath;
        }


        console.log(userDetail)


        let updateRes = await userModel.updateUserDetail(userDetail, uid)
        if (!think.isEmpty(updateRes)) {
            return this.success('successfully update')
        } else {
            return this.fail('update failed')
        }
    }

    async verifyAction() {
        return this.display('user/verify.html')
    }

    async resetAction() {
        console.log(await this.session('account'))
        console.log(await this.session('reset'))
        return this.display('user/reset.html')
    }

    async resetpasswordAction() {
        let account = await this.session('account')
        let psd = this.post('psd')
        let userModel = this.model('user')
        let updateRes = await userModel.resetPassword(account, psd)
        await this.session('reset', false)
        if (!think.isEmpty(updateRes)) {
            return this.success('successfully update')
        } else {
            return this.fail('update failed')
        }
    }

    async feedbackAction() {
        return this.display('user/feedback.html')
    }

    async sendfeedbackAction() {
        let uid = this.cookie('uid')
        let userModel = this.model('user')
        let feedbackModel = this.model('feedback')
        let nickname, userId, phoneNumber

        if (uid) {
            let userInfo = await userModel.getUserDetail(uid)
            userId = userInfo.id
            nickname = userInfo.nickname
            phoneNumber = userInfo.phoneNumber
        }

        let res = await feedbackModel.storeFeedback({
            type: this.post('type'),
            content: this.post('content'),
            contact: this.post('contact'),
            userId: userId,
            nickname: nickname,
            phoneNumber: phoneNumber
        })

        if (!think.isEmpty(res)) {
            return this.success('feedback sent')
        } else {
            return this.fail('feedback error')
        }
    }
    
    async activityAction() {
        return this.display('user/activity.html')
    }
    
    async getmyactivityAction() {
        let userGroups = await this.model('user').getUserGroups(this.cookie('uid'))
        let userGroup = JSON.parse(userGroups.groups)
        let res = await this.model('group').field('id, cover, title, joinNumber, activityTime').where({
            groupType: 1,
            id: ['IN', userGroup],
            _logic: 'AND'
        }).select()
        return this.success(res)
    }
}