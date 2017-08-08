/**
 * Created by fuyazhou on 17/8/3.
 */
'use strict'

export default class extends think.model.base {
    init(...args) {
        super.init(...args)
        this.tableName = 'groups'
    }

    async checkBeforeCreate(title) {
        let res = await this.field('id').where({title: title}).select();
        return res;
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
        let res = await this.field('id, title, theme, cover, members, groupType, activityType, updateTime').where(whereQuery).order('updateTime desc').limit(0, 3).select()
        return res
    }

    async getActivity() {
        let res = await this.field('id, cover, title').where({groupType: 1}).order('updateTime desc').limit(0, 5).select()
        return res
    }

    async getGroupInfo(id) {
        let res = this.field('id, title, theme, cover, description, members').where({id: id}).find()
        return res
    }

    async createGroup(data) {
        /*let reflect = {
         title: 'title',
         theme: 'theme',
         description: 'description',
         groupType: 'groupType',
         activityType: 'activityType',
         activityTime: 'activityTime',
         place: 'place',
         park: 'park',
         facility: 'facility',
         joinNumber: 'joinNumber',
         remark: 'remark',
         creatorName: 'nickname',
         creatorAvatar: 'avatar',
         creatorId: 'id'
         }*/
        let reflect = ['nickname', 'avatar', 'id']
        let reflected = ['creatorName', 'creatorAvatar', 'creatorId']
        for (let i in reflected) {
            data[reflected[i]] = data[reflect[i]]
            delete data[reflect[i]]
        }
        data.members = 1;
        let res = await this.add(data)
        return res
    }

    async updateCover(id, cover) {
        let lines = await this.where({id: id}).update({cover: cover});
        return lines;
    }
}


// id, title, theme, description, groupType, activityType, createTime, place, park, facility, joinNumber, remark, members, creatorName, creatorAvatar, creatorId, activityTime