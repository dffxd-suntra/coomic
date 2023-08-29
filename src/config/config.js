const defaultConfig = require("./config.default");

const config = {
    port: 3000,
    sessionConfig: { // https://github.com/koajs/session
        key: "koa.sess",
        maxAge: 604800000, // 7days
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: false, // cookie 加密
        rolling: false,
        renew: true,
        secure: true,
        sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
    }
};

module.exports = Object.assign(config, defaultConfig);