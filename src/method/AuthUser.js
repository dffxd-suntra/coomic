const db = require("../library/sqlite3");
const PasswordHash = require("phpass").PasswordHash;

function updateUserLogin(user_id, ip) {
    db.prepare("UPDATE users SET login_ip = $ip, last_login_date = (datetime('now', 'localtime')) WHERE id = $user_id;").run({ user_id, ip });
}

module.exports = function authUser({ identity_type, identifier, credential, ip = null } = {}) {
    let { user_id, credential: dbcredential, verified } = db.prepare("SELECT user_id, credential, verified AS num FROM user_auths WHERE identity_type = $identity_type AND identifier = $identifier;").get({ identity_type, identifier }) || {};
    if (user_id == undefined) {
        return { code: 400, msg: "未找到用户" };
    }
    if (["username", "phone", "email"].includes(identity_type)) {
        if (new PasswordHash().checkPassword(credential, dbcredential)) {
            updateUserLogin(user_id, ip);
            return { code: 200, msg: "登陆成功", data: { user_id } };
        } else {
            return { code: 400, msg: "用户名或密码错误" };
        }
    }
}