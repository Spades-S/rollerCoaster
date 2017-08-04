/**
 * Created by fuyazhou on 17/7/26.
 */
'use strict'

class Facility extends think.model.base {
	init(...args) {
		super.init(...args)
		this.tableName = 'facility'
	}
	async getFacility(cat, count, page, position, radius) {
		let tude = position.split(',').map(el => {
			return parseFloat(el)
		})
		radius = parseInt(radius)
		let latitudeRange = [tude[1] - radius, tude[1] + radius]
		let longitudeRange = [tude[0] - radius, tude[0] + radius]
		console.log(latitudeRange, radius)
		let res = await this.field('id, title, poster, rating, price, geolocation').where({
			category: cat,
			latitude: {'>': latitudeRange[0], '<': latitudeRange[1]},
			longitude: {'>': longitudeRange[0], '<': longitudeRange[1]}
		}).page(page, count).countSelect()
		return res
	}
	
	async getFacilityInfo(id) {
		let res = await this.where({'facility.id': id}).join("facility_detail ON facility.id=facility_detail.id").select()
		return res
	}
	
	async getFacilityByCompanyId(id) {
		let reg = 'regexp \"^' + id + ',|,' + id + ',|,' + id + '$|^' + id + '$\"'
		let res = await this.field('id, title, type, style, openTime, status').where({makeId: ['EXP', reg]}).select()
		return res
	}
}

export default Facility
