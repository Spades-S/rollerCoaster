'use strict'
import base from './base.js';
export default class extends base {
    async detailAction() {
        this.expires(86400)
        let articleId = this.get('articleid');

        if (checkLogin(this)) {
            console.log('Login checked!');

            // to be finished

        } else {
            /* let readList = (await this.session('readList')) || []
             if (readList.indexOf(parseInt(articleId)) < 0) {
             readList.push(parseInt(articleId));
             }
             await this.session('readList', readList) */
        }
        this.assign('articleid', articleId);
        return this.display('article/detail.html');
    }

    async addcommentAction() {
        if (this.isPost()) {
            let uid = this.cookie('uid');
            let articleid = this.post('articleid');
            let content = this.post('content');
            let userModel = this.model('user');
            let authorInfo = await userModel.getAuthorInfoByUserUid(uid);
            let authorAvatar = authorInfo[0].avatar;
            let authorName = authorInfo[0].nickname;
            let authorId = authorInfo[0].id;
            let commentModel = this.model('comment');
            let commentData = {
                postId: Number(articleid),
                authorId: Number(authorId),
                authorAvatar: authorAvatar,
                authorName: authorName,
                content: content,
            }
            if(this.post('replyId')){
                commentData.replyToId = Number(this.post('replyId'));
                commentData.replyToName = this.post('replyName')
            }
            let data = await commentModel.addComment(commentData);
            return this.success(data);
        }
    }

    async refresharticlesAction() {
        let readList = await this.session('readList') || []
        /*if (readList) {
         /!* if (readList.length > 5) { *!/
         greyList = readList // .splice(-5, 5);
         // console.log('greyList', greyList)
         invisibleList = readList;
         /!* } else {
         greyList = readList;
         } *!/
         }*/
        let currentPage = this.get('currentPage');
        let perPageNum = this.get('perPageNums');
        let articleModel = this.model('article');
        let data = await articleModel.getPerPageItems(perPageNum, currentPage, readList);
        data.data.forEach(el => {
            if (readList.indexOf(el.id) === -1) {
                readList.push(el.id)
            }
        })
        await this.session('readList', readList)
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
        let type = this.get('type');
        let articleModel = this.model('article');
        let authoridRowData = await articleModel.getColByArticleId(articleid);
        let col = authoridRowData[0].col;
        let relativeArticles = await articleModel.getRelativeArticlesByCol(col, articleid, type);
        if (relativeArticles.length >= 2) {
            relativeArticles = relativeArticles.slice(0, 2);
        }
        return this.success(relativeArticles);

    }

    async refreshlikesAction() {
        let likes = this.post('likes');
        let uid = this.cookie('uid');
        let articleid = parseInt(this.post('articleid'));
        console.log(articleid);
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

        let data = false;
        if (likes.indexOf(articleid) >= 0) {
            data = true;
// =======
//         let articleid = this.post('articleid');
// 	    let data = false;
// 	    if(this.cookie('uid')){
// 		    let userModel = this.model('user');
// 		    data = await userModel.updateLikes(articleid, this.cookie('uid'));
// 	    }
//         let articleModel = this.model('article');
//         await articleModel.updateLikesByArticleId(articleid, likes);
//         return this.success(data);
//     }
//
//     async getlikestatusAction() {
//         let articleid = this.get('articleid');
//         let userModel = this.model('user');
//         let uid = this.cookie('uid')
//         let rowdata = await userModel.getLikes(uid);
//         let data = false;
//         if(rowdata[0] && rowdata[0].likes.indexOf(articleid) >= 0){
// 	        data = true;
// // >>>>>>> e6f24d4ab561c0321a4a480f7995de8601e411d0
        }
        return this.success(data);
    }

    async getcommentbyarticleidAction() {
        let articleid = this.get('articleid');
        let slice = this.get('slice');
        let commentModel = this.model('comment');
        console.log('test' + articleid);
        let comment = await commentModel.getCommentByPostId(parseInt(articleid));
        let commentLength = comment.length;
        if (slice == 1) {
            if (commentLength >= 2) {
                comment = comment.splice(0, 2)
            }
        }
        return this.success({commentLength: commentLength, commentContent: comment});
    }
}