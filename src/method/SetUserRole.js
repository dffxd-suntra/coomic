const db = require("../library/sqlite3");

module.exports = function setUserRole(user_id, role) {
    let stmt;
    stmt = db.prepare("SELECT id FROM roles WHERE name = $role;");
    let { id: role_id } = stmt.get({ role });
    if (role_id == undefined) {
        return { code: 400, msg: "没有此role" };
    }
    stmt = db.prepare("INSERT INTO relationship(type, source_id, target_id) VALUES('role' , $role_id, $user_id);");
    stmt.run({ user_id, role_id });
    return { code: 200, msg: "role添加成功" };
}