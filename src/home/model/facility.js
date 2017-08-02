/**
 * Created by fuyazhou on 17/7/26.
 */
'use strict'

class Facility extends think.model.base {
	init(...args) {
		super.init(...args)
		this.tableName = 'facility'
	}
	async getFacility(cat, count, page, position) {
		let latitudeRange = [position.latitude - 1, parseFloat(position.latitude) + 1]
		let longitudeRange = [position.longitude- 1, parseFloat(position.longitude) + 1]
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
}

export default Facility
