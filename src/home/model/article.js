'use strict'
class Article extends think.model.base {
    init(...args) {
        super.init(...args);
        this.tableName = 'article';
    }

    async getPerPageItems(number, currentPage, invisibleList) {
        let data;
        if (invisibleList.length === 0) {
            data = await this.order('updateTime DESC').where({
                type: 0,
            }).page(currentPage, number).countSelect();
        } else {
            data = await this.order('updateTime DESC').where({
                type: 0,
                id: ['NOTIN', invisibleList],
            }).page(currentPage, number).countSelect();
        }
        return data;
    }

    async getArticleItemByid(id) {
        let data = await this.alias('article')
            .field('title, authorAvatar, authorName, content, updateTime, likes, col, poster')
            .where({id: id}).select();

        return data;

    }


    async getColByArticleId(articleid) {
        let authorid = await this.field('col').where({id: articleid}).select();
        return authorid;
    }

    async getRelativeArticlesByCol(col, articleid, type) {
        let relativeArticles = await this.field('id, title, description, poster, authorName').order('updateTime DESC').where({
            col: col,
            id: ['!=', articleid],
            type: type
        }).select();
        return relativeArticles;
    }

    async updateLikesByArticleId(articleid, likes) {
        console.log(likes)
        let lines = await this.where({id: articleid}).update({likes: likes});
        return lines;

    }

    async getLikeArticles(ids, currentPage, num) {
        let articles = await this.field('id, title, poster, authorAvatar, authorName, col, description, updateTime,type').page(currentPage, num).where({id: ['IN', ids]}).countSelect();
        return articles;
    }

    async decreaseLikeNumber(id) {
        let data = await this.where({id: id}).decrement('likes');
        return data;
    }

    async getKnowledgeArticles(number, page, tag) {
        let data = await this.field('id, title, poster, authorAvatar, authorName, col, description, updateTime').order('updateTime DESC').where({
            tag: tag,
            type: 0
        }).page(page, number).countSelect();
        return data;
    }

    async addPost(post) {
        let res = await this.add(post)
        return res
    }

    async updatePoster(id, poster) {
        let line = await this.where({id: id}).update({poster: poster});
        return line;
    }

    async updateCommentNum(id) {
        let data = await this.field('comments').where({id: id}).find();
        console.log('update')
        ;let line = await this.where({id: id}).update({comments: Number(data.commentNum) + 1});
        return line;
    }

}

export default Article;