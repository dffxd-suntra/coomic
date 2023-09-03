const db = require("../library/sqlite3");
const getRole = require("./GetRole");

module.exports = function getUserPermission(user_id) {
    let roles = db.prepare("SELECT source_id as role_id FROM relationship WHERE type = 'role' AND target_id = $user_id;").all({ user_id }).map(r => r.role_id);
    let permissions = {};
    roles.map(id => {
        let permission = getRole.getRoleById(id);
        for(let i in permission) {
            permissions[i] = permissions[i] || permission[i];
        }
    }, permissions);
    return permissions;
};