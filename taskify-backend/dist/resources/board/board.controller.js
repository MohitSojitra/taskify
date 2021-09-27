"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.changeColumbPosition = exports.removeMemberInBoard = exports.addMemberInBoard = exports.updateBoardById = exports.deleteBoardById = exports.getMyBoards = exports.getBoardById = exports.createBoard = exports.me = void 0;
var mongoose_1 = require("mongoose");
var auth_middleware_1 = require("../../utils/auth.middleware");
var user_model_1 = require("../user/user.model");
var board_model_1 = require("./board.model");
var me = function (req, res) {
    res.status(200).send(req['user']);
};
exports.me = me;
var createBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, bgColor, user, board, result, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, bgColor = _a.bgColor;
                user = req['user'];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, board_model_1.Board.create({
                        name: name,
                        createdBy: user._id,
                        bgColor: bgColor,
                        member: { userId: user._id },
                    })];
            case 2:
                board = _b.sent();
                return [4 /*yield*/, board_model_1.Board.populate(board, [
                        { path: 'member.userId' },
                        { path: 'createdBy' },
                    ])];
            case 3:
                result = _b.sent();
                res.status(201).send({ board: result, message: 'Sucessfully created board ' });
                return [2 /*return*/];
            case 4:
                e_1 = _b.sent();
                console.log(e_1);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed to create board', res);
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createBoard = createBoard;
var getBoardById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var board, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, board_model_1.Board.findById(req.params.id).populate('member.userId')];
            case 1:
                board = _a.sent();
                res.status(200).send({ board: board });
                return [2 /*return*/];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                (0, auth_middleware_1.sendResponseError)(500, 'Faied to fecth boared in database. please try again', res);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBoardById = getBoardById;
var getMyBoards = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var board, resData, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.log({ user: req['user']._id });
                return [4 /*yield*/, board_model_1.Board.aggregate([
                        {
                            $unwind: { path: '$member' },
                        },
                        {
                            $match: { 'member.userId': mongoose_1.Types.ObjectId(req['user']._id) },
                        },
                        {
                            $group: {
                                _id: '$_id',
                            },
                        },
                        {
                            $lookup: {
                                from: 'boards',
                                localField: '_id',
                                foreignField: '_id',
                                as: 'boards',
                            },
                        },
                        {
                            $project: {
                                boards: 1,
                                _id: 0,
                            },
                        },
                        {
                            $unwind: {
                                path: '$boards',
                            },
                        },
                    ])
                    // console.log({board: board})
                ];
            case 1:
                board = _a.sent();
                resData = board.map(function (r) {
                    return __assign(__assign({}, r.boards), { columnArr: r.boards.columns });
                });
                return [4 /*yield*/, board_model_1.Board.populate(resData, [
                        { path: 'member.userId' },
                        { path: 'createdBy' },
                    ])];
            case 2:
                result = _a.sent();
                res.status(200).send({ board: result });
                return [2 /*return*/];
            case 3:
                e_3 = _a.sent();
                console.log(e_3);
                (0, auth_middleware_1.sendResponseError)(500, 'Faied to fecth boared in database. please try again', res);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getMyBoards = getMyBoards;
var deleteBoardById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, board_model_1.Board.findByIdAndRemove(req.params.id)];
            case 1:
                _a.sent();
                res.status(200).send('delete board sucessfully');
                return [2 /*return*/];
            case 2:
                e_4 = _a.sent();
                console.log(e_4);
                (0, auth_middleware_1.sendResponseError)(500, 'Faied to delete board. please try again', res);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteBoardById = deleteBoardById;
var updateBoardById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var obj, board, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                obj = {};
                if (req.body.name) {
                    obj.name = req.body.name;
                }
                if (req.body.bgColor) {
                    obj.bgColor = req.body.bgColor;
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, board_model_1.Board.findByIdAndUpdate(req.params.id, __assign({}, obj), { new: true })];
            case 2:
                board = _a.sent();
                res.status(200).send({ board: board, message: 'Sucessfully update board' });
                return [2 /*return*/];
            case 3:
                e_5 = _a.sent();
                console.log(e_5);
                (0, auth_middleware_1.sendResponseError)(500, 'Faied to fecth boared in database. please try again', res);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateBoardById = updateBoardById;
var addMemberInBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, invitedUser, findMatch, board, result, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 2:
                invitedUser = _a.sent();
                if (!invitedUser) {
                    (0, auth_middleware_1.sendResponseError)(500, 'User Not Register with this email, please invite user threw link. ', res);
                }
                console.log({ invitedUser: invitedUser });
                return [4 /*yield*/, board_model_1.Board.aggregate([
                        {
                            $match: { _id: mongoose_1.Types.ObjectId(req.params.id) },
                        },
                        {
                            $unwind: { path: '$member' },
                        },
                        {
                            $match: { 'member.userId': mongoose_1.Types.ObjectId(invitedUser._id) },
                        },
                    ])];
            case 3:
                findMatch = _a.sent();
                console.log({ findMatch: findMatch });
                if (findMatch.length > 0) {
                    (0, auth_middleware_1.sendResponseError)(500, 'User already added in board ', res);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, board_model_1.Board.findByIdAndUpdate(req.params.id, { $push: { member: { userId: invitedUser._id } } }, { new: true })];
            case 4:
                board = _a.sent();
                return [4 /*yield*/, board_model_1.Board.populate(board, [{ path: 'member.userId' }])];
            case 5:
                result = _a.sent();
                res.send({ member: result.member, message: 'Sucessfully add member' });
                return [2 /*return*/];
            case 6:
                e_6 = _a.sent();
                console.log(e_6);
                (0, auth_middleware_1.sendResponseError)(500, 'Faied to fecth boared in database. please try again', res);
                return [2 /*return*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addMemberInBoard = addMemberInBoard;
var removeMemberInBoard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var memberUserId, board, result, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                memberUserId = req.body.memberUserId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, board_model_1.Board.findByIdAndUpdate(req.params.id, { $pull: { member: { userId: mongoose_1.Types.ObjectId(memberUserId) } } }, { upsert: false, new: true })];
            case 2:
                board = _a.sent();
                return [4 /*yield*/, board_model_1.Board.populate(board, [{ path: 'member.userId' }])];
            case 3:
                result = _a.sent();
                res.send({ member: result.member, message: 'Sucessfully delete member' });
                return [2 /*return*/];
            case 4:
                e_7 = _a.sent();
                console.log(e_7);
                (0, auth_middleware_1.sendResponseError)(500, 'Faied to fecth boared in database. please try again', res);
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeMemberInBoard = removeMemberInBoard;
var changeColumbPosition = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var columns, c, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                columns = req.body.columns;
                return [4 /*yield*/, board_model_1.Board.findByIdAndUpdate(req.params.boardId, { columns: columns }, { new: true })
                    // console.log({columns, c: c.columns})
                ];
            case 1:
                c = _a.sent();
                // console.log({columns, c: c.columns})
                res.send('Sucessfully Columb changed');
                return [3 /*break*/, 3];
            case 2:
                e_8 = _a.sent();
                console.log(e_8);
                (0, auth_middleware_1.sendResponseError)(500, 'Faied to chnage Columb', res);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.changeColumbPosition = changeColumbPosition;
