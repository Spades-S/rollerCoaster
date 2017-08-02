/**
 * Created by fuyazhou on 17/7/26.
 */
'use strict'

import base from './base'


export default class extends base {

    indexAction() {

        return this.display('discovery/index.html')
    }

    mapAction() {
        return this.display('discovery/map.html')
    }

    async facilityAction() {
        this.assign('id', this.get('id'))
        this.display('discovery/facility.html')
    }

    parkdetailAction() {
        this.assign('parkId', 1);
        return this.display('discovery/parkdetail.html');
    }


    async getfacilityAction() {
        let cat = this.get('cat')
        let count = this.get('count')
        let page = this.get('page')
        let position = JSON.parse(this.get('position'))
        let facilityModel = this.model('facility')
        let res = await facilityModel.getFacility(cat, count, page, position)
        if (think.isEmpty(res.data)) {
            return this.fail('no more')
        }
        return this.success(res)
    }


    async nearbycarsAction() {
        let lng = this.get('lng');
        let lat = this.get('lat');
        let facilityModel = this.model('facility');
        let dGeo = this.config('dGeo');
        let data = await facilityModel.getNearByCars(lng, lat, dGeo);
        for (let item of data) {
            item.poster = item.poster.split(',')[0];
        }
        console.log(data);
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

    async getparkdetailinfoAction() {
        let id = this.get('id');
        let companyModel

    }


    async getfacilityinfoAction() {
        let id = this.get('id')
        let facilityModel = this.model('facility')
        let res = await facilityModel.getFacilityInfo(id)
        if (think.isEmpty(res)) {
            return this.fail('invalid id')
        }
        return this.success(res)
    }

    async reviewAction() {
        let uid = this.cookie('uid')
        if (!uid) {
            return this.redirect('/user/login')
        }
        let id = this.get('id')
        let title = this.get('title')
        if (id) {
            await this.session('facilityId', id)
            await this.session('facilityTitle', title)
            return this.success(true)
        } else {
            this.assign('title', await this.session('facilityTitle'))
            return this.display('discovery/review.html')
        }
    }

    async getreviewAction() {
        let reviewModel = this.model('review')
        let facilityId = this.get('facilityId')
        let page = this.get(page)
        let count = this.get('count')
        let res = await reviewModel.getReview(facilityId, page, count)
        return this.success(res)
    }

    async addreviewAction() {
        let reviewModel = this.model('review')
        let userModel = this.model('user')
        let uid = this.cookie('uid')
        let userInfo = await userModel.getUserInfo(uid)
        let res = reviewModel.addReview({
            userId: userInfo.id,
            authorName: userInfo.nickname,
            avatar: userInfo.avatar,
            stars: this.post('stars'),
            position: this.post('position'),
            content: this.post('content'),
            facilityId: await this.session('facilityId')
        })
        return this.success(res)
    }

}