'use strict'

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
}