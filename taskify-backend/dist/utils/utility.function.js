"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.newToken = exports.checkPassword = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var checkPassword = function (password, passwordHash) {
    return new Promise(function (resolve, reject) {
        bcrypt_1.default.compare(password, passwordHash, function (err, same) {
            if (err) {
                reject(err);
            }
            resolve(same);
        });
    });
};
exports.checkPassword = checkPassword;
var newToken = function (user) {
    return jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.secrets.jwt, {
        expiresIn: config_1.default.secrets.jwtExp
    });
};
exports.newToken = newToken;
var verifyToken = function (token) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.verify(token, config_1.default.secrets.jwt, function (err, payload) {
            if (err)
                return reject(err);
            resolve(payload);
        });
    });
};
exports.verifyToken = verifyToken;
