const getRole = require("./GetRole");

module.exports = function getRolesPermission(roles) {
    let permissions = {};
    roles.map(name => {
        let permission = getRole.getRoleByName(name);
        for(let i in permission) {
            permissions[i] = permissions[i] || permission[i];
        }
    }, permissions);
    return permissions;
};