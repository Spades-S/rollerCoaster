'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
    type: 'mysql',
    adapter: {
        mysql: {
            host: '127.0.0.1',
            port: '',
            database: '',
            user: 'root',
            password: '203102',
            prefix: '',
            encoding: 'utf8'
        },
        mongo: {

        }
    }
};