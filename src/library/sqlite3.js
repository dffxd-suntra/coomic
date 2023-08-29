const config = require("./config/config");
const path = require("path");
const db = new require("better-sqlite3")(path.join(__dirname, config.database), { verbose: console.log });

module.exports = db;