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
	
	postAction() {
		this.assign('groupId', this.get('groupId'))
		return this.display('group/post.html')
	}
	
	async submitpostAction() {
		let uid = this.cookie('uid')
		
		let userModel = this.model('user')
		let articleModel = this.model('article')
		let userInfo = await userModel.getUserInfo(uid)
		if(think.isEmpty((userInfo))){
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
		
		if(think.isEmpty(res)){
			return this.fail('post failed')
		}
		return this.success(res)
		
		
	}
	
	async getgroupinfoAction() {
		let id = this.get('id')
		let res = await this.model('group').getGroupInfo(id)
		let userModel = this.model('user')
		if(think.isEmpty(res)) {
			return this.fail(false)
		}
		if(this.cookie('uid')){
			let userInfo = await userModel.getUserGroups(this.cookie('uid'))
			if(res.membersId && JSON.parse(res.membersId).indexOf(userInfo.id) > -1) {
				res.userInThisGroup = true
			}
		}
		return this.success(res)
	}
	
	async getpostsAction() {
		let id = this.get('id')
		console.log(id)
		let res = await this.model('article').where({type: 1, col: id}).page(0, 10).countSelect()
		if(think.isEmpty(res)){
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
}