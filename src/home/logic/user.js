/**
 * Created by fuyazhou on 17/7/11.
 */
'use strict';

export default class extends think.logic.base {

    indexAction() {

    }

    async getvfcodeAction() {
        let userModel = this.model('user');
        let account = this.post('account');
        let isExist = await userModel.isPhoneNumExist(account);
        if ((/verify/).test(this.header('Referer'))) {
            if (!isExist) {
                return this.fail('invalid account')
            } else {
                await this.session('reset', true)
            }
        } else if((/register/).test(this.header('Referer'))){
            if(isExist){
                return this.fail(1000, 'phone number exists!');
            }

        }
    }
    async registerinAction(){
        let userModel = this.model('user');
        let nickname = this.post('nickname');
        let nicknameExist = await userModel.isNickNameExist(nickname);
        if (nicknameExist) {
            return this.fail(1000, 'nickname has already existed!');
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
        if (!code) {
            return this.redirect('/user/index')
        }
    }

    async registerAction() {
        if (this.cookie('uid')) {
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
        if (this.cookie('uid')) {
            return this.redirect('/user/index')
        }
    }

    async resetAction() {
        let reset = await this.session('reset')
        if (!reset) {
            return this.redirect('/user/index')
        }
    }

    async resetpasswordAction() {
        this.allowMethods = 'post'
    }
    async likeAction(){
        let uid = this.cookie('uid');
        if(!uid){
            return this.redirect('/user/index');
        }
    }



}