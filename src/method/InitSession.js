const getRolesPermission = require("./GetRolesPermission");

module.exports = function ({ roles = ["guest"] }) {
    return function initSession(ctx, next) {
        if (!ctx.session.isNew && ctx.session.is_login) {
            return;
        }
        ctx.session.is_login = false;

        ctx.session.permissions = getRolesPermission(roles);

        next();
    };
}