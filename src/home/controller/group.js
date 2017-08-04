/**
 * Created by fuyazhou on 17/8/3.
 */
'use strict'

import base from './base'

export default class extends base {
	indexAction() {
		return this.display('group/index.html')
	}
	
	async getgroupsAction() {
		let groupModel = this.model('group')
		let res = await groupModel.getGroups()
		if(think.isEmpty(res)) {
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
		if(think.isEmpty(res)) {
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
		let list = [`cover`, `title`, `theme`, `description`, `groupType`, `activityType`, `place`, `park`, `facility`, `joinNumber`, `remark`, `activityTime`]
		for ( let i in list) {
			data[list[i]] = this.post(list[i])
		}
		data.nickname = userInfo.nickname
		data.avatar = userInfo.avatar
		data.id = userInfo.id
		let res = await groupModel.createGroup(data)
		if (think.isEmpty(res)) {
			return this.fail(false)
		}
		return this.success(true)
	}
	
	togroupdetailAction() {
		this.assign('id', this.get('id'))
		return this.display('group/posts.html')
	}
}