const db = require("../library/sqlite3");
const addUserAuth = require("./AddUserAuth");
const moment = require("moment");

module.exports = function addUser({ nickname = "机器人-" + moment().format("YYYYMMDD"), sex = "boy", avatar = null, role = "user", status = 1 } = {}, auth = []) {
    db.prepare("BEGIN TRANSACTION").run();
    const stmt = db.prepare("INSERT INTO users(nickname, sex, avatar, role, status) VALUES($nickname, $sex, $avatar, $role, $status);");
    stmt.run({ nickname, sex, avatar, role, status });

    let user_id = db.prepare("SELECT last_insert_rowid() as id FROM users;").get().id;

    for (let i in auth) {
        let rt = addUserAuth(Object.assign({ user_id }, auth[i]));
        if (rt.code != 200) {
            db.prepare("ROLLBACK TRANSACTION").run();
            return rt;
        }
    }
    db.prepare("COMMIT TRANSACTION").run();
    return { code: 200, msg: "添加成功" };
}