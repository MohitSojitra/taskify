"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    secrets: {
        jwt: 'taskify-secret',
        jwtExp: '100d',
    },
    dbUrl: 'mongodb://localhost:27017/taskify',
};
