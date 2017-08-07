'use strict';
export default class extends think.logic.base {
    addcommentAction(){
        if(!this.cookie('uid')){
            return this.fail(1000, 'not login');
        }
    }

}