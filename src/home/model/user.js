'use strict'

import rp from 'request-promise'
import crypto from 'crypto'

export default class extends think.model.base {
    init(...args) {
        super.init(...args);
        this.tableName = 'user';
    }

    async updateLikes(articleid, uid) {
        let data = await this.field('likes').where({uid: uid}).select();
        let newLikes;
        if (data[0].likes == null) {
            let likedata = new Array();
            likedata.push(articleid);
            newLikes = JSON.stringify(likedata);
        } else {
            let oldLikes = JSON.parse(data[0].likes);
            let index = oldLikes.indexOf(articleid);
            if (index >= 0) {
                oldLikes.splice(index, 1);
            } else {
                oldLikes.push(articleid);
            }
            newLikes = JSON.stringify(oldLikes);
        }
        let lines = await this.where({uid: uid}).update({likes: newLikes});
        return lines;
    }

    async getLikes(uid) {
        let data = await this.field('likes').where({uid: uid}).select();
        return data;
    }

    async getAvatarInfoByUserId(id) {
        let data = await this.field('avatar, nickname').where({id: id}).select();
        return data;
    }

    async sendMessage(phone, code) {
        try {
            let send_res = await rp({
                url: 'https://sms.yunpian.com/v2/sms/single_send.json',
                method: 'POST',
                form: {
                    apikey: 'dbbbda824548a83c9976e721ddbf4cb8',
                    mobile: phone,
                    text: code + '(欢乐冶手机验证码，请完成验证)，如非本人操作，请忽略本短信'
                }
            })
            return send_res
        } catch (err) {
            return err
        }
    }

    async register(phone, nickname, psd, uid) {
        let sha1 = crypto.createHash('sha1')
        sha1.update(psd)
        let newPsd = sha1.digest('hex')
        let id = await this.add({
            nickname: nickname,
            password: newPsd,
            phoneNumber: phone,
            uid: uid
        })
        return id
    }

    async logIntoSystem(account, psd, ck) {
        let sha1 = crypto.createHash('sha1')
        sha1.update(psd)
        let psdencrypted = sha1.digest('hex')
        let res
        if ((/^\d{11}$/).test(account)) {
            res = await this.where({phoneNumber: account, password: psdencrypted}).update({uid: ck})
        } else {
            res = await this.where({nickname: account, password: psdencrypted}).update({uid: ck})
        }
        return res
    }

    async getUserInfo(uid) {
        let userInfo = await this.field('id,nickname, avatar').where({uid: uid}).find()
        return userInfo
    }

    async getUserDetail(uid) {
        let userDetail = await this.field('id, nickname, avatar, phoneNumber, gender, birth, mail, city, introduction').where({uid: uid}).find()
        return userDetail
    }

    async updateUserDetail(detail, uid) {
        let updateRes = await this.where({uid: uid}).update({
            nickname: detail.nickname,
            avatar: detail.avatar,
            gender: detail.gender,
            birth: detail.birth,
            mail: detail.mail,
            city: detail.city,
            introduction: detail.introduction
        })
        return updateRes
    }

    async resetPassword(account, psd) {
        let sha1 = crypto.createHash('sha1')
        sha1.update(psd)
        let newPsd = sha1.digest('hex')
        let updateRes = await this.where({phoneNumber: account}).update({password: newPsd})
        return updateRes
    }

    async isPhoneNumExist(account) {
        let res = await this.where({phoneNumber: account}).find()

        if (think.isEmpty(res)) {

            return false
        } else {

            return true
        }
    }

    async isNickNameExist(nickName) {
        let res = await this.where({nickname: nickName}).find()
        if (think.isEmpty(res)) {
            return false
        } else {
            return true
        }
    }
}
