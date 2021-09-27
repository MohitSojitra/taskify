"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("./user.controller");
var router = (0, express_1.Router)();
router.route("/me")
    .get(user_controller_1.me);
exports.default = router;
