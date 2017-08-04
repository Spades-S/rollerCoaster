/**
 * Created by fuyazhou on 17/8/2.
 */
'use strict'

export default class extends think.model.base {
	init(...args) {
		super.init(...args)
		this.tableName = 'company'
	}
	
	async getFactoryList() {
		let res = await this.field('id, title').where({type: 2}).select()
		return res
	}
	
	async getFactoryInfo(id) {
		let res = await this.where({id: id}).find()
		return res
	}
}