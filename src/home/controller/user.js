import base from './base.js';

const msg_send_config = require('../config/config')
const rp = require('request-promise')

export default class extends base {
    indexAction() {
        return this.display('user/register.html');
    }

    async getvfcodeAction() {
    	try {
		    let phone = this.post('phone')
		    let code = generateVerificationCode()
		    
		    let userModel = this.model('user')
		    // let send_res = await userModel.sendMessage(phone, code)
		
		    await this.session('phone', phone)
		    await this.session('verificationCode', Number(code))
		    
		    let sessionCode = await this.session('verificationCode')
		    console.log(sessionCode)
		    
		    this.success('123')
		    // this.success(send_res)
		    
	    } catch(err) {
    		this.fail(err, this.errors())
	    }
    }
	
	async verifycodeAction() {
    	return this.success('successfully verified')
    }
    
    async passwordAction() {
    	return this.display('user/password.html')
    }
}