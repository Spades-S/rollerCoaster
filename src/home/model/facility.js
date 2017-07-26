/**
 * Created by fuyazhou on 17/7/26.
 */
'use strict'

class Facility extends think.model.base {
	init(...args) {
		super.init(...args)
		this.tableName = 'facility'
	}
	async getFacility(cat, count, page) {
		let res = await this.field('title, poster, rating, price, geolocation').where({category: cat}).page(page, count).countSelect()
		return res
	}
}

export default Facility