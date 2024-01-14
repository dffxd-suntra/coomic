const config = require("../config/config");
const addUser = require("../method/AddUser");
const _ = require("lodash");
const authUser = require("../method/AuthUser");
const getUserInfo = require("../method/GetUserInfo");
const refreshUserSession = require("../method/RefreshUserSession");

module.exports.user_register = (ctx, next) => {
    if (!ctx.session.permissions.register_user) {
        ctx.response.status = 401;
        ctx.body = { code: 401, msg: "您没有注册的权限" };
        return;
    }

    // 坏的用户，不干好事，天天就想搞我的网站
    let { nickname, identity_type, identifier, credential, sex } = ctx.request.body;
    // 判定
    if (_.isString(nickname) && 1 <= nickname.length && nickname.length <= 20) { } else {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "昵称不符合规范" };
        return;
    }
    if (["username", "phone", "email"].includes(identity_type)) { } else {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "验证方式不符合规范" };
        return;
    }
    if (_.isString(identifier) && identifier.length <= 128) { } else {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "标识不符合规范" };
        return;
    }
    if (_.isString(credential) && credential.length <= 128) { } else {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "凭据不符合规范" };
        return;
    }
    if (["boy", "girl", "none"].includes(sex)) { } else {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "不符合规范" };
        return;
    }
    ctx.body = addUser({ nickname, sex }, [{ identity_type, identifier, credential }]);
};

module.exports.user_login = (ctx, next) => {
    if (ctx.session.user_id != undefined) {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "不符合规范" };
        return;
    }
    let { identity_type, identifier, credential } = ctx.request.body;
    // 现在仅限这三种，以后会添加oauth2的验证登陆功能
    if (["username", "phone", "email"].includes(identity_type)) { } else {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "不符合规范" };
        return;
    }
    if (_.isString(identifier) && identifier.length <= 128) { } else {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "不符合规范" };
        return;
    }
    if (_.isString(credential) && credential.length <= 128) { } else {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "不符合规范" };
        return;
    }
    let res = authUser({ identity_type, identifier, credential, ip: ctx.ip });
    if (res.code == 200) {
        ctx.session.user_id = res.data.user_id;
        ctx.session.login_date = Date.now();
        ctx.session.is_login = true;
        refreshUserSession(ctx.session);
    }
    ctx.body = session.data;
};

// 登出的除了用户还有使用
module.exports.user_logout = (ctx, next) => {
    ctx.session = null;
    ctx.body = { code: 200, msg: "您已退出登录" };
};

module.exports.user_info = (ctx, next) => {
    if (ctx.session.permissions.discover_site) {
        ctx.response.status = 401;
        ctx.body = { code: 401, msg: "您没有权限访问" };
        return;
    }
    console.log(ctx);
    let user_id = ctx.params.user_id || null;
    if (user_id == null) {
        if (ctx.session.is_login) {
            user_id = ctx.session.user_id;
        } else {
            ctx.response.status = 400;
            ctx.body = { code: 400, msg: "不符合规范" };
            return;
        }
    } else {
        user_id = +user_id;
    }

    if (user_id == ctx.session.user_id) {
        ctx.body = ctx.session.data;
    } else {
        let { id, nickname, sex, avatar = config.defaultAvatar, status, register_date } = getUserInfo(ctx.session.user_id);
        ctx.body = { id, nickname, sex, avatar, status, register_date };
    }
};

module.exports.user_info_update = (ctx, next) => {
    if (ctx.session.is_login || ctx.session.user_id != ctx.params.user_id) {
        ctx.response.status = 401;
        ctx.body = { code: 401, msg: "您没有权限访问" };
        return;
    }
};