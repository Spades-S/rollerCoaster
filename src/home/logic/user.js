/**
 * Created by fuyazhou on 17/7/11.
 */
'use strict';

export default class extends think.logic.base {
	indexAction(){
	
	}
	
	async getvfcodeAction() {
		let userModel = this.model('user')
		let account = this.post('account')
		
		if((/verify/).test(this.header('Referer'))){
			let isPhoneNumExist = await userModel.isPhoneNumExist(account)
			if(think.isEmpty(isPhoneNumExist)){
				return this.fail('invalid account')
			} else {
				await this.session('reset', true)
			}
		} else {
			let isPhoneNumExist = await userModel.isPhoneNumExist(account);
			if (!think.isEmpty(isPhoneNumExist)) {
				return this.fail('phone number exists!')
			}
		}
	}
	
	async verifycodeAction() {
		this.allowMethods = 'get'
		let sessionCode = await this.session('code')
		if (Number(this.get('code')) !== Number(sessionCode)) {
			return this.fail('validate error', this.errors())
		}
	}
	
	async passwordAction() {
		let code = await this.session('code')
		console.log(code)
		if(!code){
			return this.redirect('/user/index')
		}
	}
	
	async registerAction() {
		if(this.cookie('uid')){
			return this.redirect('/user/index')
		}
		this.allowMethods = 'get,post'
	}
	
	async loginAction() {
		this.allowMethods = 'get'
	}
	
	async loginintosystemAction() {
		this.allowMethods = 'post'
	}
	
	async verifyAction() {
		if(this.cookie('uid')) {
			return this.redirect('/user/index')
		}
	}
	
	async resetAction() {
		let reset = await this.session('reset')
		if(!reset){
			return this.redirect('/user/index')
		}
	}
	
	async resetpasswordAction() {
		this.allowMethods = 'post'
	}
}