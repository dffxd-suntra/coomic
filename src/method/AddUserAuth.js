const db = require("../library/sqlite3");

module.exports = function addUserAuth({ user_id = null, isOAuth2 = 0, identity_type = "", identifier = "", credential = "", verified = 1 } = {}) {
    const stmt = db.prepare("INSERT INTO user_auths(user_id, isOAuth2, identity_type, identifier, credential, verified) VALUES($user_id, $isOAuth2, $identity_type, $identifier, $credential, $verified);");
    stmt.run({ user_id, isOAuth2, identity_type, identifier, credential, verified });
    return { code: 200, msg: "添加成功" };
}