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
        this.assign('id', Number(this.get('id')));
        this.display('discovery/facility.html');
    }

    parklistAction() {
        return this.display('discovery/parklist.html')
    }

    parkdetailAction() {
        this.assign('parkId', this.get('id'));
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

    async getparklistAction() {
        let count = this.get('count');
        let page = this.get('page');
        let position = JSON.parse(this.get('position'));
        let companyModel = this.model('company');
        let dGeo = this.config('dGeo');
        let data = await companyModel.getnearbycompany(1, position, dGeo, page, count);
        return this.success(data);

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
        let id = Number(this.get('id'));
        let companyModel = this.model('company');
        let data = await companyModel.getCompanyDetailById(id);
        if (think.isEmpty(data)) {
            return this.fail(1000, 'no detail!');
        }
        return this.success(data);
    }

    async getfacilitylistAction() {
        let id = Number(this.get('id'));
        let facilityModel = this.model('facility');
        let res = await facilityModel.getFacilityListByParkID(id);
        return this.success(res);
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