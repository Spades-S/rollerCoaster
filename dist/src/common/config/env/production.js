'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    db: {
        type: 'mysql',
        adapter: {
            mysql: {
                host: '127.0.0.1',
                port: '3306',
                database: 'HUANLEYE',
                user: 'root',
                password: '654321',
                prefix: '',
                encoding: 'utf8'
            },
            mongo: {}
        }
    }

};
//# sourceMappingURL=production.js.map