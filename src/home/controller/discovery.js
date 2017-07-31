/**
 * Created by fuyazhou on 17/7/26.
 */
'use strict'

import base from './base'


export default class extends base {
    indexAction() {

        this.display('discovery/index.html')
    }

    async getfacilityAction() {
        let cat = this.get('cat')
        let count = this.get('count')
        let page = this.get('page')
        let facilityModel = this.model('facility')
        let res = await facilityModel.getFacility(cat, count, page)
        if (think.isEmpty(res.data)) {
            console.log('23')
            return this.fail('no more')
        }
        return this.success(res)
    }

    async mapAction() {
        this.display('discovery/map.html')
    }

    async nearbycarsAction() {
        let lng = this.get('lng');
        let lat = this.get('lat');
        let facilityModel = this.model('facility');
        let dGeo = this.config('dGeo');
        let data = await facilityModel.getNearByCars(lng, lat, dGeo);
        return this.success(data);

    }


    async gettestdataAction() {
        let lng = 63.2306,
            lat = 22.8579;
        let facilityModel = this.model('facility');
        let dGeo = this.config('dGeo');
        let data = await facilityModel.getNearByCars(lng, lat, dGeo);
        return this.success(data);
    }
}