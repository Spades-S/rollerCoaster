/**
 * Created by fuyazhou on 17/7/11.
 */
'use strict';

export default class extends think.logic.base {
	indexAction(){
	
	}
	
	async verifycodeAction() {
		this.allowedMethods = 'get'
		let sessionCode = await this.session('verificationCode')
		console.log(Number(this.get('code')) !== Number(sessionCode))
		if (Number(this.get('code')) !== Number(sessionCode)) {
			return this.fail('validate error', this.errors())
		}
	}
}