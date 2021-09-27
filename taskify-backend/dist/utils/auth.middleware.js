"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.validateAuthInput = exports.sendResponseError = void 0;
var user_model_1 = require("../resources/user/user.model");
var utility_function_1 = require("./utility.function");
var sendResponseError = function (statusCode, msg, res) {
    res.status(statusCode || 400).send(!!msg ? msg : "Invalid input !!");
};
exports.sendResponseError = sendResponseError;
var validateAuthInput = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, emailRegex, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.hostname, req.originalUrl);
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                if (!!!email || !!!password) {
                    (0, exports.sendResponseError)(400, "Invalid Input", res);
                    return [2 /*return*/];
                }
                emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!emailRegex.test(String(email).toLowerCase())) {
                    (0, exports.sendResponseError)(400, "please enter valid email", res);
                    return [2 /*return*/];
                }
                if (password.length < 8) {
                    (0, exports.sendResponseError)(400, "password have must 8 charecter", res);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (req.originalUrl.includes("signup")) {
                    if (!!user) {
                        (0, exports.sendResponseError)(400, "account alerady open with this email ", res);
                        return [2 /*return*/];
                    }
                }
                else if (req.originalUrl.includes("signin")) {
                    if (!!!user) {
                        (0, exports.sendResponseError)(400, "email not exist !", res);
                    }
                    else {
                        req.body.user = user;
                    }
                }
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.validateAuthInput = validateAuthInput;
var protect = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authorization, payload, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authorization = req.headers.authorization;
                if (!authorization) {
                    (0, exports.sendResponseError)(400, "You are not authorized ", res);
                    return [2 /*return*/];
                }
                else if (!authorization.startsWith("Bearer ")) {
                    (0, exports.sendResponseError)(400, "You are not authorized ", res);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, (0, utility_function_1.verifyToken)(authorization.split(" ")[1])];
            case 2:
                payload = _a.sent();
                console.log(payload);
                if (!payload) return [3 /*break*/, 4];
                return [4 /*yield*/, user_model_1.User.findById(payload.id)];
            case 3:
                user = _a.sent();
                req["user"] = user;
                // req.push({user : user})
                next();
                return [3 /*break*/, 5];
            case 4:
                (0, exports.sendResponseError)(400, "you are not authorizeed", res);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.log("Error ", err_1);
                (0, exports.sendResponseError)(400, "Error " + err_1, res);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.protect = protect;
