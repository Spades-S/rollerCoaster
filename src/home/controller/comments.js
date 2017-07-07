import base from './base.js';
export default class extends base {
    indexAction() {
        this.assign("articleid", this.get('articleid'));
        return this.display('article/comments.html');
    }
    async refreshcommentsAction(){
        let articleid =  this.get('articleid');
        let number = this.get('perPageNums');
        let currentPage = this.get('currentPage');
        let commentModel = this.model('comment');
        let data = await commentModel.getPerPageComments(articleid, number, currentPage);
        return this.success(data);

    }
}