/**
 * Created by fuyazhou on 17/8/3.
 */
'use strict'

import base from './base'
import fs from 'fs';

export default class extends base {
    indexAction() {
        return this.display('group/index.html')
    }

    async getgroupsAction() {
        let groupModel = this.model('group')
        let res = await groupModel.getGroups()
        if (think.isEmpty(res)) {
            return this.fail(false)
        }
        return this.success(res)
    }

    async getmygroupAction() {
        let userModel = this.model('user')
        let groupModel = this.model('group')
        let userInfo = await userModel.getUserGroups(this.cookie('uid'))
        if (userInfo.id) {
            let res = await groupModel.getMyGroup(userInfo.id, userInfo.groups)
            return this.success(res)
        }
        return this.fail(false)
    }

    async getmoregroupsAction() {
        let groupType = Number(this.get('groupType'));
        let num = Number(this.get('num'));
        let currentPage = Number(this.get('currentPage'));
        let groupModel = this.model('group');
        if (groupType === 5) {
            let userModel = this.model('user');
            let userInfo = await userModel.getUserGroups(this.cookie('uid'));
            if (userInfo.id) {
                let res = await groupModel.getMyGroupMore(num, currentPage, userInfo.groups, userInfo.id)
                return this.success(res)
            }
            return this.fail(false);
        } else {
            let res = await groupModel.gerGroupsMore(groupType, num, currentPage);
            return this.success(res);
        }
    }

    async getactivityAction() {
        let res = await this.model('group').getActivity()
        if (think.isEmpty(res)) {
            return this.fail(false)
        }
        return this.success(res)
    }

    createAction() {
        if (this.cookie('uid')) {
            return this.display('group/create.html')
        }
        return this.redirect('/user/login')
    }

    async creategroupAction() {
        let uid = this.cookie('uid')
        let userModel = this.model('user')
        let groupModel = this.model('group')
        let userInfo = await userModel.getUserInfo(uid)
        let data = {}
        let list = [`title`, `theme`, `description`, `groupType`, `activityType`, `place`, `park`, `facility`, `joinNumber`, `remark`, `activityTime`]
        for (let i in list) {
            data[list[i]] = this.post(list[i])
        }
        data.nickname = userInfo.nickname
        data.avatar = userInfo.avatar
        data.id = userInfo.id

        let groupid = await groupModel.createGroup(data)
        if (think.isEmpty(groupid)) {
            return this.fail(1000, 'update group info err')
        }
        if (this.post('cover')) {
            let _this = this;
            console.log('inner');
            let avatarBase64 = this.post('cover').split(',')[1];
            let avatarBinary = new Buffer(avatarBase64, 'base64').toString('binary');
            let basePath = this.config('avatarBasePath');
            let detailPath = '/groupcover/' + groupid + '.png';
            fs.writeFile(basePath + detailPath, avatarBinary, 'binary', function (err) {
                if (err) {
                    console.log('write err');
                }
            });
            let lines = await groupModel.updateCover(groupid, detailPath);
            if (think.isEmpty(lines)) {
                return this.fail(1000, 'update group info err')
            }
        }
        return this.success();

    }

    togroupdetailAction() {
        this.assign('id', this.get('id'))
        return this.display('group/posts.html')
    }

    postAction() {
        this.assign('groupId', this.get('groupId'))
        return this.display('group/post.html')
    }

    postdetailAction() {
        this.assign('id', Number(this.get('id')));
        return this.display('group/postdetail.html');
    }

    async submitpostAction() {
        let uid = this.cookie('uid')

        let userModel = this.model('user')
        let articleModel = this.model('article')
        let userInfo = await userModel.getUserInfo(uid)
        let posterArr = JSON.parse(this.post('poster'));
        if (think.isEmpty((userInfo))) {
            return this.fail('not login')
        }
        let post = {
            title: this.post('title'),
            content: this.post('content'),
            col: this.post('groupId'),
            authorId: userInfo.id,
            authorAvatar: userInfo.avatar,
            authorName: userInfo.nickname,
            type: 1
        }
        let res = await articleModel.addPost(post)

        if (think.isEmpty(res)) {
            return this.fail('post failed')
        } else {
            let basePath = this.config('avatarBasePath');
            let poster = [];
            posterArr.forEach(function (item, index) {
                let detailPath = '/article/' + res + 'dot' + index + '.png';
                console.log('/article/' + res + 'dot' + index + '.png');
                let posterBase64 = item.split(',')[1];
                let posterBinary = new Buffer(posterBase64, 'base64').toString('binary');
                poster.push(detailPath);
                fs.writeFile(basePath + detailPath, posterBinary, 'binary', function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            })
            let line = await articleModel.updatePoster(res, JSON.stringify(poster));
            return this.success(line);

        }


    }

    async getgroupinfoAction() {
        let id = this.get('id')
        let res = await this.model('group').getGroupInfo(id)
        let userModel = this.model('user')
        if (think.isEmpty(res)) {
            return this.fail(false)
        }
        if (this.cookie('uid')) {
            let userInfo = await userModel.getUserGroups(this.cookie('uid'))
            if (res.membersId && JSON.parse(res.membersId).indexOf(userInfo.id) > -1) {
                res.userInThisGroup = true
            }
        }
        return this.success(res)
    }

    async getpostsAction() {
        let id = this.get('id')
        console.log(id)
        let res = await this.model('article').where({type: 1, col: id}).page(0, 10).countSelect()
        if (think.isEmpty(res)) {
            return this.fail('no posts')
        }
        return this.success(res)
    }

    async joingroupAction() {
        let uid = this.cookie('uid')
        let groupModel = this.model('group')
        let userModel = this.model('user')
        let userInfo = await userModel.getUserGroups(uid)
        let userId = userInfo.id
        console.log(this.post('groupId'))
        let res = groupModel.addGroupMember(this.post('groupId'), userId)
        return this.success(res)
    }

    async quitgroupAction() {
        let uid = this.cookie('uid')
        let groupModel = this.model('group')
        let userModel = this.model('user')
        let userInfo = await userModel.getUserGroups(uid)
        let userId = userInfo.id
        let res = groupModel.deleteGroupMember(this.post('groupId'), userId)
        return this.success(res)
    }

    async getpostcontentAction() {
        let id = Number(this.get('id'));
        let articleModel = this.model('article');
        let data = await articleModel.getArticleItemByid(id);
        if (think.isEmpty(data)) {
            return this.fail(1000, 'no message');
        }
        return this.success(data);
    }

}