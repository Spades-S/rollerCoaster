'use strict'

class Facility extends think.model.base {
    init(...args) {
        super.init(...args)
        this.tableName = 'company'
    }


}