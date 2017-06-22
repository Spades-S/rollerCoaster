'use strict'
import base from './base.js';
export default class extends base {
    detailAction() {
        this.assign('articleid', this.get('articleid'));
        return this.display('article/detail.html');
    }
    async addcommentAction() {
        if (this.isPost()) {
            let userid = this.post("userid");
            let articleid = this.post('articleid');
            let timestamp = this.post('timestamp');
            let content = this.post('content');
            let articleModel = this.model('comment');
            let data = await articleModel.addComment(parseInt(userid), parseInt(articleid), content, parseInt(timestamp));
            return this.success(data);
        }
    }
    async refresharticlesAction() {
        let currentPage = this.get('currentPage');

        let perPageNum = this.get('perPageNums');

        let articleModel = this.model('article');
        let data = await articleModel.getPerPageItems(currentPage, perPageNum);
        return this.success(data);
    }
    async getarticlebyarticleidAction() {

        let articleid = this.get('articleid');
        let articleModel = this.model('article');
        let data = await articleModel.getArticleItemByid(articleid);
        return this.success(data);

    }
    async getrelativearticleAction() {
        let articleid = this.get('articleid');
        let articleModel = this.model('article');
        let authoridRowData = await articleModel.getAuthoridByArticleId(articleid);
        let authorid = authoridRowData[0].authorid;
        let relativeArticles = await articleModel.getRelativeArticlesByAuthorId(authorid, articleid);
        return this.success(relativeArticles);

    }
}