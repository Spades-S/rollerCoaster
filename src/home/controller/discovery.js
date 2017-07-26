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
		if(think.isEmpty(res)){
			return this.success('no more facility')
		}
		return this.success(res)
	}
}