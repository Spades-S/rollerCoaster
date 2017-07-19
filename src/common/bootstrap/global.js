/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 * 
 * global.fn1 = function(){
 *     
 * }
 */

global.generateVerificationCode = function () {
	return Math.floor(Math.random()*900000 + 100000)
}

global.generateUid = function () {
	let str = 'QWERTYUIOPLKJHGFDSAZXCVBNM123456789qwertyuioplkjhgfdsazxvcbnm'
	let ck = ''
	for(let i=0;i<18;i++){
		ck += str.charAt(Math.floor(Math.random()*61))
	}
	return ck
}

global.checkLogin = function (_this) {
	if(_this.cookie('uid')){
		return true
	} else {
		return false
	}
}

global.delayAction = function (timeout) {
	setTimeout(function () {
		return new Promise(resolve => {
			resolve(true)
		})
	}, timeout)
}