const db = require("../library/sqlite3");
const getRole = require("./GetRole");
const getUserRoles = require("./GetUserRoles");

module.exports = function getUserPermission(user_id) {
    let roles = getUserRoles(user_id);
    let permissions = {};
    roles.map(id => {
        let permission = getRole.getRoleById(id);
        for (let i in permission) {
            if (["id", "name"].includes(i)) {
                continue;
            }
            permissions[i] = permissions[i] || permission[i];
        }
    }, permissions);
    return permissions;
};