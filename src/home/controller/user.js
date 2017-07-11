import base from './base.js';

const sendSms = require('node-aliyun-sms')

export default class extends base {
    indexAction() {
        return this.display('user/register.html');
    }

    getvfcodeAction() {
        console.log(sendSms)
        if (this.isPost()) {
            let phone = this.post('phone')
            const ssp = sendSms({
                accessKeyId: 'LTAI6wMOjrC1Y26j',
                accessKeySecret: 'gOhm0YgkKdPFEgrPTHmaAxKCLZ0tFE',
                signName: '',
                templateCode: '',
                to: phone,
                paramString: {

                }
            })
            ssp.then(ret => {
                console.log(ret)
                return ret
            }, err => {
                console.log(err)
                return err
            })
        }
    }
}