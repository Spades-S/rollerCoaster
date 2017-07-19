'use strict'
class Article extends think.model.base {
    init(...args) {
        super.init(...args);
        this.tableName = 'article';
    }

    async getPerPageItems(number, currentPage) {
        let data = await this.order('updateTime DESC').where({type: 0}).page(currentPage, number).countSelect();
        return data;
    }

    async getArticleItemByid(id) {
        let data = await this.alias('article')

            .field('title, authorAvatar, authorName, content, updatetime, likes, col')
            .where({id: id}).select();

        return data;

    }

    async getColByArticleId(articleid) {
        let authorid = await this.field('col').where({id: articleid}).select();
        return authorid;
    }

    async getRelativeArticlesByCol(col, articleid) {
        let relativeArticles = await this.field('id, title, description, poster').order('updateTime DESC').where({
            col: col,
            id: ['!=', articleid],
            type: 0
        }).select();
        return relativeArticles;
    }

    async updateLikesByArticleId(articleid, likes) {
        let lines = await this.where({id: articleid}).update({likes: likes});
        return lines;

    }

}

export default Article;