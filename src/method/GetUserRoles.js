const db = require("../library/sqlite3");

module.exports = function getUserRoles(user_id) {
    let roles = db.prepare("SELECT source_id as role_id FROM relationship WHERE type = 'role' AND target_id = $user_id;").all({ user_id }).map(r => r.role_id);
    if (roles.length == 0) {
        return { code: 400, msg: "no user id" };
    }
    return roles;
};