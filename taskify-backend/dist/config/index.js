"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var env = process.env.NODE_ENV || 'development';
console.log({ env: env });
var baseConfig = {
    env: env,
    isDev: env === 'development',
    isProd: env === 'production',
    port: process.env.PORT || 3000,
    secrets: {
        jwt: process.env.JWT_SECRET || '12345-67890-09876-54321',
        jwtExp: '100d',
    },
};
var envConfig;
switch (env) {
    case 'dev':
    case 'development':
        envConfig = require('./dev').config;
        break;
    case 'prod':
    case 'production':
        envConfig = require('./prod').config;
        break;
    default:
        envConfig = require('./dev').config;
}
exports.default = (0, lodash_1.merge)(baseConfig, envConfig);
