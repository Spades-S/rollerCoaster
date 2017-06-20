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

    }
}

export default Article;