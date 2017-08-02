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
        console.log(position);
        let latitudeRange = [parseFloat(position.latitude) - 1, parseFloat(position.latitude) + 1]
        let longitudeRange = [parseFloat(position.longitude)- 1, parseFloat(position.longitude) + 1]
        let res = await this.field('id, title, poster, rating, price, geolocation').where({
            category: cat,
            latitude: {'>': latitudeRange[0], '<': latitudeRange[1]},
            longitude: {'>': longitudeRange[0], '<': longitudeRange[1]}
        }).page(page, count).countSelect()
        return res
    }

    async getNearByCars(lng, lat, dGeo) {
        lng = 63.2306;
        lat = 22.8579;
        lng = Number(lng);
        lat = Number(lat);
        let res = await this.field('id, title, poster, location, park, style, openTime, status, closeTime, model, make, longitude, latitude').where({
            category: 1,
            longitude: {'>': lng - dGeo.lng, '<': lng + dGeo.lng},
            latitude: {'>': lat - dGeo.lat, '<': lat + dGeo.lat}
        }).select();
        return res;
    }



	async getFacilityInfo(id) {
		let res = await this.where({'facility.id': id}).join("facility_detail ON facility.id=facility_detail.id").select()
		return res
	}
}

export default Facility
