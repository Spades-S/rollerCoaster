'use strict'
class Comment extends think.model.base {
    init(...args) {
        super.init(...args);
        this.tableName = 'comment';
    }

    async addComment(data) {
        try {
            let insertId = await this.add(data);
            return insertId;
        } catch (e) {
            think.log(`add user cause wrong ${e}`);
            return false;
        }
    }


    async getCommentByPostId(postid) {
        let data = await this.order('updateTime ASC').field('authorId, authorAvatar, authorName, content, updateTime, replyToName').where({postid: postid}).select();
        return data;
    }

    async getPerPageComments(postId, number, currentPage) {
         let data = await this.field('authorAvatar, authorName, content, updateTime').order('id DESC').where({postId: postId}).page(currentPage, number).countSelect();

        return data;
    }
}

export default Comment;