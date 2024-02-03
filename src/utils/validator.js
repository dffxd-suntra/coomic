const config = require("../config/config");
const _ = require("lodash");

module.exports = {
    nickname(str) {
        return _.isString(str) && new RegExp(config.verifyRegexp.nickname).test(str);
    },
    username(str) {
        return _.isString(str) && new RegExp(config.verifyRegexp.username).test(str);
    },
    phone(str) {
        return _.isString(str) && new RegExp(config.verifyRegexp.phone).test(str);
    },
    email(str) {
        return _.isString(str) && new RegExp(config.verifyRegexp.email).test(str);
    },
    password(str) {
        return _.isString(str) && new RegExp(config.verifyRegexp.password).test(str);
    },
    identity_type(str) {
        return _.isString(str) && new RegExp(config.verifyRegexp.identity_type).test(str);
    },
    sex(str) {
        return _.isString(str) && new RegExp(config.verifyRegexp.sex).test(str);
    },
    identifier(identity_type, identifier, credential) {
        return _.isString(identity_type) && _.isString(identifier) && _.isString(credential) && this.identity_type(identity_type) && this[identity_type](identifier) && this.password(credential);
    }
};