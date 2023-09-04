const config = require("../config/config");
const addUser = require("../method/AddUser");
const _ = require("lodash");
const authUser = require("../method/AuthUser");
const getUserInfo = require("../method/GetUserInfo");

module.exports.user_register = (ctx, next) => {
    // 坏的用户，不干好事，天天就想搞我的网站
    let { nickname, identity_type, identifier, credential, sex } = ctx.request.body;
    // 判定
    if (_.isString(nickname) && 1 <= nickname.length && nickname.length <= 20) { } else {
        ctx.throw(400);
        return;
    }
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
    if (["boy", "girl", "none"].includes(sex)) { } else {
        ctx.throw(400);
        return;
    }
    ctx.body = addUser({ nickname, sex }, [{ identity_type, identifier, credential }]);
};

module.exports.user_login = (ctx, next) => {
    if (ctx.session.user_id != undefined) {
        ctx.throw(400);
        return;
    }
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
    let res = authUser({ identity_type, identifier, credential, ip: ctx.ip });
    if (res.code == 200) {
        ctx.session.user_id = res.data.user_id;
        ctx.session.login_date = Date.now();
        ctx.session.is_login = true;
    }
    let { id, nickname, sex, avatar = config.defaultAvatar, status, register_date } = getUserInfo(ctx.session.user_id);
    res.data = { id, nickname, sex, avatar, status, register_date };
    ctx.body = res;
};

// 登出的除了用户还有使用
module.exports.user_logout = (ctx, next) => {
    ctx.session = { isNew: true };
    ctx.body = { code: 200, msg: "您已退出登录" };
};

module.exports.user_info = (ctx, next) => {
    let { user_id = ctx.session.user_id } = ctx.request.body;
    if (_.isSafeInteger(user_id) || (_.isString(user_id) && user_id.match(/^\d+$/g) != null)) {
        user_id = parseInt(user_id);
    } else {
        ctx.throw(400);
        return;
    }
    let { id, nickname, sex, avatar = config.defaultAvatar, status, register_date } = getUserInfo(user_id);
    ctx.body = { id, nickname, sex, avatar, status, register_date };
};
