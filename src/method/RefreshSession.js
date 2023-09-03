const db = require("../library/sqlite3");
const getUserPermission = require("./GetUserPermission");

module.exports = function refreshSession(session) {
    if (!session.is_login) {
        return;
    }
    ctx.session.permissions = getUserPermission(ctx.session.user_id);
}