'use strict'
import base from './base.js';
export default class extends base {
    detailAction() {
        return this.display('article/detail.html');
    }
}