const db = require("../utils/knex");
const addUserAuth = require("./AddUserAuth");
const moment = require("moment");
const setUserRole = require("./SetUserRole");

module.exports = function addUser({ nickname = moment().format("机器人-YYYYMMDD"), sex = "none", avatar = null, status = 1, role = ["user"] } = {}, auth = []) {
    db.prepare("BEGIN TRANSACTION").run();
    // 创建用户
    let stmt = db.prepare("INSERT INTO users(nickname, sex, avatar, status) VALUES($nickname, $sex, $avatar, $status);");
    stmt.run({ nickname, sex, avatar, status });

    let user_id = db.prepare("SELECT last_insert_rowid() as id FROM users;").get().id;

    // 添加角色
    for (let i in role) {
        let rt = setUserRole(user_id, role[i]);
        if (rt.code != 200) {
            db.prepare("ROLLBACK TRANSACTION").run();
            return rt;
        }
    }

    // 添加验证方式
    for (let i in auth) {
        let rt = addUserAuth(Object.assign({ user_id }, auth[i]));
        if (rt.code != 200) {
            db.prepare("ROLLBACK TRANSACTION").run();
            return rt;
        }
    }
    // TRANSACTION太省事辣！
    db.prepare("COMMIT TRANSACTION").run();
    return { code: 200, msg: "添加成功" };
}