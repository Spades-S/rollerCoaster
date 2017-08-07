/**
 * Created by fuyazhou on 17/8/3.
 */
'use strict'

export default class extends think.model.base{
	init(...args) {
		super.init(...args)
		this.tableName = 'groups'
	}
	
	async getGroups() {
		let res = await this.query('select a.id, a.title, a.theme, a.cover, a.members, a.groupType, a.activityType, a.updateTime from groups a where 3> (select count(*) from groups b where a.theme = b.theme and a.id<b.id) order by a.theme, a.updateTime desc')
		
		return res
	}
	
	async getMyGroup(id, userGroups) {
		let whereQuery
		if (userGroups) {
			whereQuery = {
				creatorId: id,
				id: ['IN', userGroups.split(',')],
				_logic: 'OR'
			}
		} else {
			whereQuery = {
				creatorId: id
			}
		}
		let res = await this.field('id, title, theme, cover, members, groupType, activityType, updateTime').where(whereQuery).order('updateTime desc').limit(0,3).select()
		return res
	}
	
	async getActivity() {
		let res = await this.field('id, cover, title').where({groupType: 1}).order('updateTime desc').limit(0, 5).select()
		return res
	}
	
	async getGroupInfo(id) {
		let res = this.where({id: id}).find()
		return res
	}
	
	async createGroup(data) {
		let reflect = ['nickname', 'avatar', 'id']
		let reflected = ['creatorName', 'creatorAvatar', 'creatorId']
		for(let i in reflected) {
			data[reflected[i]] = data[reflect[i]]
			delete data[reflect[i]]
		}
		let res = await this.add(data)
		let userModel = this.model('user')
		await userModel.updateMyGroup(res, data.creatorId)
		await this.updateGroupMembers(res, data.creatorId)
		return res
	}
	
	async updateGroupMembers(groupId, id) {
		let res = await this.field('id, membersId').where({id: groupId}).find()
		let membersId = res.membersId ? JSON.parse(res.membersId).push(id) : [id]
		await this.where({id: groupId}).update({membersId: JSON.stringify(membersId)})
	}
	
	async addGroupMember(groupId, userId) {
		let groupMembers = await this.field('id, membersId').where({id: groupId}).find()
		console.log(groupId)
		let membersId = groupMembers.membersId ? JSON.parse(groupMembers.membersId) : []
		membersId.push(userId)
		let res = await this.where({id: groupId}).update({membersId: JSON.stringify(membersId)})
		console.log(res)
		return res
	}
	
	async deleteGroupMember(groupId, userId) {
		let groupMembers = await this.field('id, membersId').where({id: groupId}).find()
		let membersId = JSON.parse(groupMembers.membersId)
		if (membersId.indexOf(userId) > -1) {
			membersId.splice(membersId.indexOf(userId), 1)
			await this.where({id: groupId}).update({membersId: JSON.stringify(membersId)})
		}
		return true
	}
}


// id, title, theme, description, groupType, activityType, createTime, place, park, facility, joinNumber, remark, members, creatorName, creatorAvatar, creatorId, activityTime