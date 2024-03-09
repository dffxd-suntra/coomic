const config = require("../config/config");
const path = require("path");
const knex = require("knex")({
    client: "better-sqlite3",
    connection: {
        filename: path.join(__dirname, "..", config.database)
    },
    debug: true,
    
});

module.exports = knex;