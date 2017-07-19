import base from './base.js';

export default class extends base {
    indexAction() {
	    if(checkLogin(this)){
		    this.assign('uid', this.cookie('uid'))
		    return this.display('user/index.html');
	    } else {
	    	return this.redirect('/user/login')
	    }
    }
    
    async registerAction() {
	    return this.display('user/register.html')
    }

    async getvfcodeAction() {
    	try {
    		
		    let account = this.post('account')
		    let code = generateVerificationCode()
		    
		    // let userModel = this.model('user')
		    // let send_res = await userModel.sendMessage(phone, code)
		
		    await this.session('account', account)
		    await this.session('code', Number(code))
		    
		    let sessionCode = await this.session('code')
		    console.log(sessionCode)
		    
		    return this.success(true)
		    // this.success(send_res)
		    
	    } catch(err) {
    		return this.fail(err, this.errors())
	    }
    }
	
	async verifycodeAction() {
    	return this.success('successfully verified')
    }
    
    async passwordAction() {
    	if(checkLogin(this)){
    		return this.redirect('index')
	    } else {
		    return this.display('user/password.html')
	    }
    }
    
    async registerinAction() {
    	try {
		    let phone = await this.session('phone'),
			    nickname = this.post('nickname'),
			    psd = this.post('psd')
		    let userModel = this.model('user')
		
		    let ck = generateUid()
		    let data = await userModel.register(phone, nickname, psd, ck)
		
		    this.cookie('uid', ck)
		    console.log(data)
		
		    return this.success(data)
	    } catch(err) {
    		return this.fail(err)
	    }
    }
    
    async loginAction() {
    	let uid = this.cookie('uid')
	    if(uid){
    		return this.redirect('/user/index')
	    }
    	return this.display('user/login.html')
    }
    
    async logintosystemAction() {
        let account = this.post('account')
	    let psd = this.post('psd')
	    let userModel = this.model('user')
	
	    let ck = generateUid()
	    let loginRes = await userModel.logIntoSystem(account, psd, ck)
	    
	    let isEmpty = think.isEmpty(loginRes)
	    
	    console.log(isEmpty)
	    
	    if(!isEmpty){
		    this.cookie('uid', ck)
		    return this.success(loginRes)
	    } else {
	    	return this.fail('login error')
	    }
    }
    
    async getuserinfoAction() {
    	try {
		    let uid = this.cookie('uid')
		    let userModel = this.model('user')
		    let userInfo = await userModel.getUserInfo(uid)
		    console.log(userInfo)
		    if(!think.isEmpty(userInfo)){
			    return this.success(userInfo)
		    } else {
			    await this.cookie('uid', null)
			    return this.fail('invalid uid')
		    }
	    } catch (err) {
		    await this.cookie('uid', null)
		    return this.fail('invalid uid')
	    }
    }
    
    async detailAction() {
    	return this.display('user/detail.html')
    }
    
    async getuserdetailAction() {
	    let uid = this.cookie('uid')
	    let userModel = this.model('user')
	    let userDetail = await userModel.getUserDetail(uid)
	    if(!think.isEmpty(userDetail)){
		    return this.success(userDetail)
	    } else {
		    this.cookie('uid', null)
		    return this.fail('invalid uid')
	    }
    }
    
    async editAction() {
    	return this.display('user/edit.html')
    }
    
    async updateuserdetailAction() {
    	let userDetail = {
    		nickname: this.post('nickname'),
		    avatar: this.post('avatar'),
		    gender: this.post('gender'),
		    birth: this.post('birth'),
		    mail: this.post('mail'),
		    introduction: this.post('introduction'),
		    city: this.post('city')
	    }
	    console.log(userDetail)
	    let uid = this.cookie('uid')
	    let userModel = this.model('user')
	    let updateRes = await userModel.updateUserDetail(userDetail, uid)
	    if(!think.isEmpty(updateRes)){
    		return this.success('successfully update')
	    } else {
	    	return this.fail('update failed')
	    }
    }
    
    async verifyAction() {
    	return this.display('user/verify.html')
    }
    
    async resetAction() {
    	console.log(await this.session('account'))
    	console.log(await this.session('reset'))
    	return this.display('user/reset.html')
    }
    
    async resetpasswordAction() {
    	let account = await this.session('account')
	    let psd = this.post('psd')
	    let userModel = this.model('user')
	    let updateRes = await userModel.resetPassword(account, psd)
	    await this.session('reset', false)
	    if(!think.isEmpty(updateRes)){
		    return this.success('successfully update')
	    } else {
		    return this.fail('update failed')
	    }
    }
}