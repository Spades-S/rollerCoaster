'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        //auto render template file index_index.html
        // await this.session('readList', null)      // --> clear session
        console.log(await this.session('readList'))
        return this.display('index/index.html');
        // return this.display();
    }
}