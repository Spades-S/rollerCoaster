/**
 * Created by fuyazhou on 17/7/26.
 */
'use strict'

class Facility extends think.model.base {


    init(...args) {
        super.init(...args)
        this.tableName = 'facility'
    }

    async getFacility(cat, count, page, position, radius, readList) {
        radius = parseInt(radius)
        let latitudeRange = [parseFloat(position.latitude) - radius, parseFloat(position.latitude) + radius]
        let longitudeRange = [parseFloat(position.longitude) - radius, parseFloat(position.longitude) + radius]
        let res = await this.field('id, title, poster, rating, price, geolocation').where({
            category: cat,
            latitude: {'>': latitudeRange[0], '<': latitudeRange[1]},
            longitude: {'>': longitudeRange[0], '<': longitudeRange[1]},
            id: ['NOT IN', readList]
        }).page(page, count).countSelect()
        return res
    }

    async getNearByCars(lng, lat, dGeo) {
        // lng = 63.2306;
        // lat = 22.8579;
        lng = Number(lng);
        lat = Number(lat);
        let res = await this.field('id, title, poster, location, park, style, openTime, status, closeTime, model, make, longitude, latitude').where({
            category: 1,
            longitude: {'>': lng - dGeo.lng, '<': lng + dGeo.lng},
            latitude: {'>': lat - dGeo.lat, '<': lat + dGeo.lat}
        }).limit(0,99).select();
        return res;
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

    async getFacilityListByParkID(parkID) {
        let res = await this.field('id, title, type, style, openTime, status, closeTime').where({parkId: parkID}).select();
        return res;
    }

    async updateRatingById(id, rating) {
        let ratingInfo = await this.field('rating, ratingNum').where({id: id}).find();
        let ratingNew = (ratingInfo.rating * ratingInfo.ratingNum + rating) / (ratingInfo.ratingNum + 1);
        let lines = await this.where({id: id}).update({rating: ratingNew, ratingNum: ratingInfo.ratingNum + 1});
        return lines;
    }

}

export default Facility
