const config = require("../config/config");
const getUserPermission = require("./GetUserPermission");
const getUserInfo = require("./GetUserInfo");
const getUserRoles = require("./GetUserRoles");

module.exports = function refreshUserSession(session) {
    if (!session.is_login) {
        return;
    }
    let { id, nickname, sex, avatar = config.defaultAvatar, status, register_date } = getUserInfo(session.user_id);
    session.data = { id, nickname, sex, avatar, status, register_date };
    
    session.roles = getUserRoles(session.user_id);
    session.permissions = getUserPermission(session.user_id);
}