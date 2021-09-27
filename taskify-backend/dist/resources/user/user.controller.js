"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = void 0;
var me = function (req, res) {
    res.status(200).send(req['user']);
};
exports.me = me;
