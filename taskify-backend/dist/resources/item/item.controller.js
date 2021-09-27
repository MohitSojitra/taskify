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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.getAllComment = exports.deleteComment = exports.createComment = exports.deleteItemById = exports.updateItemById = exports.getItemById = exports.createItem = exports.updateColumn = void 0;
var mongoose_1 = require("mongoose");
var auth_middleware_1 = require("../../utils/auth.middleware");
var boardColumn_model_1 = require("../boardColumn/boardColumn.model");
var item_model_1 = require("./item.model");
var _ = __importStar(require("lodash"));
var updateItemType = {
    ADD_ITEM: 'ADD_ITEM',
    DELETE_ITEM: 'DELETE_ITEM',
};
var updateColumn = function (id, body) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, c, i;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = body.type;
                switch (_a) {
                    case updateItemType.ADD_ITEM: return [3 /*break*/, 1];
                    case updateItemType.DELETE_ITEM: return [3 /*break*/, 3];
                }
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, boardColumn_model_1.Column.findByIdAndUpdate(id, {
                    $push: { items: { item: body.items[0] } },
                }, { new: true })];
            case 2:
                c = _b.sent();
                return [2 /*return*/, _.last(c.items)];
            case 3: return [4 /*yield*/, boardColumn_model_1.Column.updateOne({ _id: id }, { $pull: { items: { item: mongoose_1.Types.ObjectId(body.items[0]) } } }, { upsert: false, new: true })];
            case 4:
                i = _b.sent();
                return [2 /*return*/];
            case 5: return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateColumn = updateColumn;
var createItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, item, itemArrItem, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req['user'];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, item_model_1.Item.create({
                        createdBy: user._id,
                        boardId: req.params.boardId,
                        name: req.body.name,
                        bgColor: req.body.color,
                    })];
            case 2:
                item = _a.sent();
                return [4 /*yield*/, (0, exports.updateColumn)(req.params.columnId, {
                        type: updateItemType.ADD_ITEM,
                        items: [item._id],
                    })];
            case 3:
                itemArrItem = _a.sent();
                res
                    .status(201)
                    .send({ message: 'Sucessfully created item ', item: item, itemArrItem: itemArrItem });
                return [2 /*return*/];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed to create item', res);
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createItem = createItem;
var getItemById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var item, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, item_model_1.Item.findById(req.params.itemId)
                        .populate('boardId')
                        .populate('createdBy')];
            case 1:
                item = _a.sent();
                res.status(201).send({ item: item });
                return [2 /*return*/];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed fetch item', res);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getItemById = getItemById;
var updateItemById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var obj, item, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                obj = {};
                if (req.body.name)
                    obj.name = req.body.name;
                if (req.body.description)
                    obj.description = req.body.description;
                if (req.body.bgColor)
                    obj.bgColor = req.body.bgColor;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, item_model_1.Item.findByIdAndUpdate(req.params.itemId, __assign({}, obj), { new: true })];
            case 2:
                item = _a.sent();
                res.status(202).send({ message: 'Update item sucessfully', item: item });
                return [2 /*return*/];
            case 3:
                e_3 = _a.sent();
                console.log(e_3);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed fetch item', res);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateItemById = updateItemById;
var deleteItemById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, item_model_1.Item.findByIdAndRemove(req.params.itemId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, exports.updateColumn)(req.params.columnId, {
                        type: updateItemType.DELETE_ITEM,
                        items: [req.params.itemId],
                    })];
            case 2:
                _a.sent();
                res.status(202).send({ message: 'Delete item sucessfully' });
                return [2 /*return*/];
            case 3:
                e_4 = _a.sent();
                console.log(e_4);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed fetch item', res);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteItemById = deleteItemById;
var createComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, item, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req['user'];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, item_model_1.Item.findByIdAndUpdate(req.params.itemId, {
                        $push: {
                            comments: {
                                item: req.params.itemId,
                                author: user._id,
                                message: req.body.message,
                            },
                        },
                    }, { new: true })
                    // const result = await Item.populate(item, [
                    //   {path: 'comment.author'},
                    //   {path: 'comment.'},
                    // ])
                ];
            case 2:
                item = _a.sent();
                // const result = await Item.populate(item, [
                //   {path: 'comment.author'},
                //   {path: 'comment.'},
                // ])
                res.status(201).send({
                    message: 'Comment added sucessfully ',
                    comment: {
                        message: req.body.message,
                        createdAt: new Date().getTime(),
                        _id: item.comments[0]._id,
                    },
                });
                return [2 /*return*/];
            case 3:
                e_5 = _a.sent();
                console.log(e_5);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed to create Comment', res);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createComment = createComment;
var deleteComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                //TODO: Delete commnet code goes to here...
                return [4 /*yield*/, item_model_1.Item.updateOne({ _id: req.params.itemId }, { $pull: { comments: { _id: mongoose_1.Types.ObjectId(req.params.commentId) } } }, { upsert: false, new: true })];
            case 1:
                //TODO: Delete commnet code goes to here...
                _a.sent();
                res.status(200).send({
                    message: 'SuccessFully Removed Comment. ',
                });
                return [2 /*return*/];
            case 2:
                e_6 = _a.sent();
                console.log(e_6);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed to create Comment', res);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteComment = deleteComment;
var getAllComment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var i, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, item_model_1.Item.findById(req.params.itemId)];
            case 1:
                i = _a.sent();
                res.status(200).send({
                    message: 'SuccessFully fetch all comment. ',
                    comments: _.reverse(i.comments),
                });
                return [2 /*return*/];
            case 2:
                e_7 = _a.sent();
                console.log(e_7);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed get all comment', res);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllComment = getAllComment;
