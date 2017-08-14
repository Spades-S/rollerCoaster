/**
 * Created by fuyazhou on 17/8/8.
 */
'use strict'
import base from './base'

export default class extends base {
    indexAction() {
        return this.display('search/index.html')
    }

    async searchbykeywordAction() {
        let keyword = decodeURI(this.get('keyword'))
        let num = Number(this.get('num'));
        let currentPage = Number(this.get('currentPage'));
        let type = parseInt(this.get('type'))
        if (type < 4) {
            let model = this.model('facility')
            let res = await model.field('id, title, rating, poster').where({
                title: ['like', '%' + keyword + '%'],
                category: type
            }).page(currentPage, num).countSelect()
            return this.success(res)
        } else if (type === 4) {
            let model = this.model('group')
            console.log(keyword)
            let res = await model.field('id, title, members, cover').where({
                title: ['like', '%' + keyword + '%']
            }).page(currentPage, num).countSelect()
            return this.success(res)
        } else if (type === 5) {
            let model = this.model('article')
            console.log(keyword)
            let res = await model.field('id, title, poster, updateTime').where({
                title: ['like', '%' + keyword + '%']
            }).page(currentPage, num).countSelect()
            return this.success(res)
        }
    }
}