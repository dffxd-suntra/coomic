const defaultConfig = require("./config.default");

const config = {
    port: 3000,
    sessionConfig: { // https://github.com/koajs/session
        key: "koa.sess",
        maxAge: 604800000, // 7days
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true, // cookie 加密
        rolling: false,
        renew: true,
        secure: false,
        sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
    },
    corsConfig: {
        origin: "*",
        allowMethods: "*",
        allowHeaders: "*"
    },
    verifyRegexp: {
        nickname: "^\\S{4,32}$",
        username: "^\\w{4,32}$",
        phone: "^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$",
        email: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
        password: "^\\w{8,32}$",
        identity_type: "^(username|phone|email)$",
        sex: "^(boy|girl|secret)$"
    }
};

module.exports = Object.assign(config, defaultConfig);