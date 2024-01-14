const db = require("../utils/sqlite3");
const config = require("../config/config");

module.exports = function getUserInfo(user_id) {
    return db.prepare("SELECT * FROM users WHERE id = $user_id;").get({ user_id }) || false;
};