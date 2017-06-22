'use strict'
class Article extends think.model.base {
    init(...args) {
        super.init(...args);
        this.tableName = 'T_ARTICLE';
    }
    async getPerPageItems(number, currentPage) {
        let data = await this.order('id DESC').page(number, currentPage).countSelect();
        return data;
    }
    async getArticleItemByid(id) {
        let data = await this.alias('article')
            .field('title, authorAvatar, authorName, content, updatetime')
            .where({ id: id }).select();
        return data;

    }
    async getAuthoridByArticleId(articleid) {
        let authorid = await this.field('authorid').where({ id: articleid }).select();
        return authorid;
    }
    async getRelativeArticlesByAuthorId(authorid, articleid) {
        let relativeArticles = await this.field('id, title, description, poster').where({ authorid: authorid, id: ['!=', articleid] }).select();
        return relativeArticles;
    }

}

export default Article;