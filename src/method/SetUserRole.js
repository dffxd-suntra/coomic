const db = require("../library/sqlite3");

module.exports = function setUserRole(user_id, role) {
    let { id: role_id } = db.prepare("SELECT id FROM roles WHERE name = $role;").get({ role }) || {};
    if (role_id == undefined) {
        return { code: 400, msg: "没有此role" };
    }
    db.prepare("INSERT INTO relationship(type, source_id, target_id) VALUES('role' , $role_id, $user_id);").run({ user_id, role_id });
    return { code: 200, msg: "role添加成功" };
}