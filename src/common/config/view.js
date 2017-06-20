'use strict';
/**
 * template config
 */
export default {
    type: 'nunjucks',
    content_type: 'text/html',
    file_ext: '.html',
    file_depr: '/',
    root_path: think.ROOT_PATH + '/view',
    adapter: {
        nunjucks: {} //使用 nunjucks 模板引擎时额外配置
    }
};