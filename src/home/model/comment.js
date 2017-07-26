'use strict'
class Comment extends think.model.base {
    init(...args) {
        super.init(...args);
        this.tableName = 'comment';
    }

    async addComment(userid, articleid, authorAvatar, authorName, content, timestamp) {
        try {
            let insertId = await this.add({
                "authorId": userid,
                "authorAvatar": authorAvatar,
                "authorName": authorName,
                "postId": articleid,
                "content": content,
                "updateTime": timestamp
            });
            return insertId;
        } catch (e) {
            think.log(`add user cause wrong ${e}`);
            return false;
        }
    }


    async getCommentByPostId(postid) {
        let data = await this.field('authorAvatar, authorName, content, updateTime').where({postid: postid}).select();
        return data;
    }

    async getPerPageComments(postId, number, currentPage) {
         let data = await this.field('authorAvatar, authorName, content, updateTime').order('id DESC').where({postId: postId}).page(currentPage, number).countSelect();

        return data;
    }
}

export default Comment;