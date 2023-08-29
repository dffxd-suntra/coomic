const addUser = require("../method/AddUser");
const _ = require("lodash");
const PasswordHash = require("phpass").PasswordHash;
const authUser = require("../method/AuthUser");

module.exports.user_register = (ctx, next) => {
    // 坏的用户，不干好事，天天就想搞我的网站
    let { nickname, username, password, sex } = ctx.request.body;
    // 判定
    if (_.isString(nickname) && 1 <= nickname.length && nickname.length <= 20) { } else {
        ctx.throw(400);
        return;
    }
    if (_.isString(username) && 1 <= username.length && username.length <= 20) { } else {
        ctx.throw(400);
        return;
    }
    if (_.isString(password) && 8 <= password.length && password.length <= 128) { } else {
        ctx.throw(400);
        return;
    }
    if (["boy", "girl", "none"].includes(sex)) { } else {
        ctx.throw(400);
        return;
    }
    ctx.body = addUser({ nickname, sex }, [{ identity_type: "username", identifier: username, credential: new PasswordHash().hashPassword(password) }]);
};

module.exports.user_login = (ctx, next) => {
    let { identity_type, identifier, credential } = ctx.request.body;
    // 现在仅限这三种，以后会添加oauth2的验证登陆功能
    if (["username", "phone", "email"].includes(identity_type)) { } else {
        ctx.throw(400);
        return;
    }
    if (_.isString(identifier) && identifier.length <= 128) { } else {
        ctx.throw(400);
        return;
    }
    if (_.isString(credential) && credential.length <= 128) { } else {
        ctx.throw(400);
        return;
    }
    ctx.body = authUser(identity_type, identifier, credential);
};

module.exports.user_info = (ctx, next) => { };
