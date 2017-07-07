'use strict'
class Article extends think.model.base {
    init(...args) {
        super.init(...args);
        this.tableName = 'article';
    }
    async getPerPageItems(number, currentPage) {
        let data = await this.order('id DESC').where({ type: 0 }).page( currentPage,number).countSelect();
        return data;
    }
    async getArticleItemByid(id) {
        let data = await this.alias('article')
            .field('title, authorAvatar, authorName, content, updatetime, likes')
            .where({ id: id }).select();
        return data;

    }
    async getAuthoridByArticleId(articleid) {
        let authorid = await this.field('authorid').where({ id: articleid }).select();
        return authorid;
    }
    async getRelativeArticlesByAuthorId(authorid, articleid) {
        let relativeArticles = await this.field('id, title, description, poster').where({ authorid: authorid, id: ['!=', articleid], type: 0 }).select();
        return relativeArticles;
    }
    async updateLikesByArticleId(articleid, likes) {
        let lines = await this.where({ id: articleid }).update({ likes: likes });
        return lines;

    }

}

export default Article;