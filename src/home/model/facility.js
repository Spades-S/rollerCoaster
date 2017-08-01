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
}

export default Facility