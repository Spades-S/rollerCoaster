'use strict'
import base from './base.js';
export default class extends base {
    detailAction() {
        let articleId = this.get('articleid');

        if (checkLogin(this)) {
            console.log('Login checked!');

            // to be finished

        } else {
            if (!this.cookie('readList')) {
                let readList = new Array();
                readList.push(parseInt(articleId));

                this.cookie('readList', JSON.stringify(readList));
            } else {
                let readList = JSON.parse(this.cookie('readList'));
                if (readList.indexOf(parseInt(articleId)) < 0) {
                    readList.push(parseInt(articleId));
                    this.cookie('readList', JSON.stringify(readList));
                }
            }
        }
        this.assign('articleid', articleId);
        return this.display('article/detail.html');
    }

    async addcommentAction() {
        if (this.isPost()) {
            let userid = this.post("userid");
            let articleid = this.post('articleid');
            let timestamp = this.post('timestamp');
            let content = this.post('content');
            let userModel = this.model('user');
            let authorInfo = await userModel.getAvatarInfoByUserId(parseInt(userid));
            let authorAvatar = authorInfo[0].avatar;
            let authorName = authorInfo[0].nickname;
            let articleModel = this.model('comment');
            let data = await articleModel.addComment(parseInt(userid), parseInt(articleid), authorAvatar, authorName, content, parseInt(timestamp));
            return this.success(data);
        }
    }

    async refresharticlesAction() {
        let greyList = [];
        let invisibleList = [];
        if (this.cookie('readList') !== '') {
            let readList = JSON.parse(this.cookie('readList'));
            if (readList.length > 5) {
                greyList = readList.splice(-5, 5);
                invisibleList = readList;
            } else {
                greyList = readList;
            }
        }
        let currentPage = this.get('currentPage');
        let perPageNum = this.get('perPageNums');
        let articleModel = this.model('article');
        let data = await articleModel.getPerPageItems(perPageNum, currentPage, invisibleList);
        data.greyList = greyList;
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
        let authoridRowData = await articleModel.getColByArticleId(articleid);
        let col = authoridRowData[0].col;
        let relativeArticles = await articleModel.getRelativeArticlesByCol(col, articleid);
        if (relativeArticles.length >= 2) {
            relativeArticles = relativeArticles.slice(0, 2);
        }
        return this.success(relativeArticles);

    }

    async refreshlikesAction() {
        let likes = this.post('likes');
        let uid = this.cookie('uid');
        let articleid = parseInt(this.post('articleid'));
        let articleModel = this.model('article');
        let art_lines = await articleModel.updateLikesByArticleId(articleid, likes);
        if (uid) {
            let userModel = this.model('user');
            let data = await userModel.updateLikes(articleid, uid);
            return this.success(data);
        } else {
            let likecookie = this.cookie('likecookie');
            let newlikearray = [];
            if (likecookie) {
                newlikearray = JSON.parse(likecookie);
                if (newlikearray.indexOf(articleid) < 0) {
                    newlikearray.push(articleid);
                }
            } else {
                newlikearray.push(articleid);
            }
            this.cookie('likecookie', JSON.stringify(newlikearray));
            return this.success();
        }

    }

    async getlikestatusAction() {
        let uid = this.cookie('uid');
        let articleid = parseInt(this.get('articleid'));
        let likes = [];
        if (uid) {
            let userModel = this.model('user');
            let rowdata = await userModel.getLikes(uid);
            likes = JSON.parse(rowdata[0].likes);
        } else {
            if (this.cookie('likecookie')) {
                likes = JSON.parse(this.cookie('likecookie'));
            }
        }
        let data;
        if (likes.indexOf(articleid) >= 0) {
            data = true;
        } else {
            data = false;
        }
        return this.success(data);
    }

    async getcommentbyarticleidAction() {
        let articleid = this.get('articleid');
        let commentModel = this.model('comment');
        let comment = await commentModel.getCommentByPostId(parseInt(articleid));
        let commentLength = comment.length;
        if (commentLength >= 2) {
            comment = comment.splice(0, 2)
        }
        return this.success({commentLength: commentLength, commentContent: comment});
    }
}