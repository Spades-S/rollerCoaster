
/**
 * Created by fuyazhou on 17/8/2.
 */
'use strict'

class Company extends think.model.base {
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

    async getCompanyDetailById(id) {
        let res = await this.field('title, location, openTime, status, phoneNumber, website, owner, poster,geolocation').where({id: id}).find();
        return res;

    }

    async getnearbycompany(type, position, dGeo, page, count) {
        let lng = Number(position.longitude);
        let lat = Number(position.latitude);
        let res = await this.field('id, title, poster, geolocation').where({
            type: type,
            longitude: {'>': lng - dGeo.lng, '<': lng + dGeo.lng},
            latitude: {'>': lat - dGeo.lat, '<': lat + dGeo.lat}
        }).page(page, count).countSelect()
        return res;


    }


}
export default Company;

