const db = require("../utils/sqlite3");
const PasswordHash = require("phpass").PasswordHash;

module.exports = function addUserAuth({ user_id = null, is_oauth2 = 0, identity_type = "", identifier = "", credential = "", verified = 1 } = {}) {
    if (["username", "phone", "email"].includes(identity_type)) {
        if (db.prepare("SELECT count(*) AS num FROM user_auths WHERE identity_type = $identity_type AND identifier = $identifier;").get({ identity_type, identifier }).num != 0) {
            return { code: 400, msg: "用户名，邮箱或手机不可以重复" };
        }
        credential = new PasswordHash().hashPassword(credential)
    }
    // 不止插入
    let stmt = db.prepare("INSERT INTO user_auths(user_id, is_oauth2, identity_type, identifier, credential, verified) VALUES($user_id, $is_oauth2, $identity_type, $identifier, $credential, $verified);");
    stmt.run({ user_id, is_oauth2, identity_type, identifier, credential, verified });
    return { code: 200, msg: "添加成功" };
}