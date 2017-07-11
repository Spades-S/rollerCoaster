'use strict'

const rp = require('request-promise')

export default class extends think.model.base {
    init(...args) {
        super.init(...args);
        this.tableName = 'user';
    }

    async updateLikes(articleid) {
        let data = await this.field('likes').where({id: 1}).select();
        let newLikes;
        if (data[0].likes == "") {
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
        let lines = await this.where({id: 1}).update({likes: newLikes});
        return lines;
    }

    async getLikes() {
        let data = await this.field('likes').where({id: 1}).select();
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
}