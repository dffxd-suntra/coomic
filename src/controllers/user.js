const config = require("../config/config");
const addUser = require("../method/AddUser");
const _ = require("lodash");
const authUser = require("../method/AuthUser");
const getUserInfo = require("../method/GetUserInfo");
const refreshUserSession = require("../method/RefreshUserSession");
const validator = require("../utils/validator");

module.exports.user_register = (ctx, next) => {
    if (!ctx.session.permissions.register_user) {
        ctx.response.status = 401;
        ctx.body = { code: 401, msg: "您没有注册的权限" };
        return;
    }

    // 坏的用户，不干好事，天天就想搞我的网站
    let { nickname, identity_type, identifier, credential, sex } = ctx.request.body;
    // 判定
    if (!validator.nickname(nickname)) {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "昵称不符合规范" };
        return;
    }
    if (!validator.identifier(identity_type, identifier, credential)) {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "凭据不符合规范" };
        return;
    }
    if (validator.sex(sex)) {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "非常抱歉，我尊重所有人对于自己性别的看法，但还是请使用主流性别！！！" };
        return;
    }
    ctx.body = addUser({ nickname, sex }, [{ identity_type, identifier, credential }]);
};

module.exports.user_login = (ctx, next) => {
    if (ctx.session.is_login) {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "请先退出登录" };
        return;
    }

    let { identity_type, identifier, credential } = ctx.request.body;
    // 现在仅限这三种，以后会添加oauth2的验证登陆功能
    if (!validator.identifier(identity_type, identifier, credential)) {
        ctx.response.status = 400;
        ctx.body = { code: 400, msg: "凭据不符合规范" };
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

    ctx.body = { code: 200, msg: "成功", data: {} };
    if (user_id == ctx.session.user_id) {
        ctx.body.data = _.cloneDeep(ctx.session.data);
    } else {
        let { id, nickname, sex, avatar = config.defaultAvatar, status, register_date } = getUserInfo(ctx.session.user_id);
        ctx.body.data = { id, nickname, sex, avatar, status, register_date };
    }
};

module.exports.user_info_update = (ctx, next) => {
    if (ctx.session.is_login || ctx.session.user_id != ctx.params.user_id) {
        ctx.response.status = 401;
        ctx.body = { code: 401, msg: "您没有权限访问" };
        return;
    }
};