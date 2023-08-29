const db = require("../library/sqlite3");
const addUserAuth = require("./AddUserAuth");
const moment = require("moment");

module.exports = function addUser({ nickname = "机器人-" + moment().format("YYYYMMDD"), sex = "boy", avatar = null, role = "user", status = "active" } = {}, auth = []) {
    const stmt = db.prepare("INSERT INTO users(nickname, sex, avatar, role, status) VALUES($nickname, $sex, $avatar, $role, $status);");
    stmt.run({ nickname, sex, avatar, role, status });

    let user_id;

    for (let i in auth) {
        addUserAuth(Object.assign({ user_id }, auth[i]));
    }
    return { code: 200, msg: "添加成功" };
}