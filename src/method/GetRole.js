const db = require("../utils/sqlite3");
const _ = require("lodash");

module.exports.getRoleByName = function getRoleByName(name) {
    return _.mapValues(db.prepare("SELECT * FROM roles WHERE name = $name;").get({ name }) || {}, (v, k) => (["id", "name"].includes(k) ? v : !!v));
}

module.exports.getRoleById = function getRoleById(id) {
    return _.mapValues(db.prepare("SELECT * FROM roles WHERE id = $id;").get({ id }) || {}, (v, k) => (["id", "name"].includes(k) ? v : !!v));
}