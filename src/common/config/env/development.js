'use strict';

export default {
    db:{
        type: 'mysql',
        adapter: {
            mysql: {
                host: '127.0.0.1',
                port: '3306',
                database: 'HUANLEYE',
                user: 'root',
                password: '203102',
                prefix: '',
                encoding: 'utf8'
            },
            mongo: {

            }
        }
    },
    avatarBasePath: '/Users/spades/Documents/PROJECT/roller coaster/rollerCoaster/www/static/img',

};