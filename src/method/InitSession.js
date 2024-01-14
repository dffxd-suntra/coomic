const getRolesPermission = require("./GetRolesPermission");
const refreshUserSession = require("./RefreshUserSession");

/**
 * 用户会话预处理
 * @param {*} param0 
 * @returns 
 */
module.exports = function ({ roles = ["guest"] } = {}) {
    return function initSession(ctx, next) {
        if (ctx.session.isNew) {
            ctx.session.is_login = false;
            ctx.session.roles = roles;
        }

        if (ctx.session.is_login) {
            refreshUserSession(ctx.session);
        } else {
            ctx.session.permissions = getRolesPermission(roles);
        }

        next();
    };
}