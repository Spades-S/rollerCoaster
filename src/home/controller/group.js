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
            fs.writeFileSync(basePath + detailPath, avatarBinary, 'binary', function (err) {
                console.log(err);
                return _this.fail(1010, 'write err');
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

    async getgroupinfoAction() {
        let id = this.get('id')
        let res = await this.model('group').getGroupInfo(id)
        if (think.isEmpty(res)) {
            return this.fail(false)
        }
        return this.success(res)
    }
}