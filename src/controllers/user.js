const addUser = require("../method/AddUser");
const _ = require("lodash");
const PasswordHash = require("phpass").PasswordHash;

module.exports.user_register = (ctx, next) => {
    let { nickname = null, username, password, sex } = ctx.request.body;
    // 判定
    if ((nickname === null || _.isString(nickname)) && nickname.length <= 20) { } else {
        ctx.throw(400);
        return;
    }
    if (_.isString(username) && username.length <= 20) { } else {
        ctx.throw(400);
        return;
    }
    if (_.isString(password) && password.length <= 128) { } else {
        ctx.throw(400);
        return;
    }
    if (["boy", "girl", "none"].includes(sex)) { } else {
        ctx.throw(400);
        return;
    }
    addUser({ nickname, sex }, [{identity_type: "username", identifier: username, credential: new PasswordHash().hashPassword(password)}])
};

module.exports.user_login = (ctx, next) => { };

module.exports.user_info = (ctx, next) => { };
