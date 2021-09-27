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
exports.changeItemPositionInDiffrentContainer = exports.changeItemPositionInSameContainer = exports.getColumns = exports.deleteColumn = exports.changeColumnMetaData = exports.addColumn = exports.updateBoard = exports.me = void 0;
var mongoose_1 = require("mongoose");
var auth_middleware_1 = require("../../utils/auth.middleware");
var board_model_1 = require("../board/board.model");
var boardColumn_model_1 = require("./boardColumn.model");
var _ = __importStar(require("lodash"));
var updateItemType = {
    ADD_COLUMN: 'ADD_COLUMN',
    DELETE_COLUMN: 'DELTE_COLUMN',
};
var me = function (req, res) {
    res.status(200).send(req['user']);
};
exports.me = me;
var updateBoard = function (id, body) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, b;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = body.type;
                switch (_a) {
                    case updateItemType.ADD_COLUMN: return [3 /*break*/, 1];
                    case updateItemType.DELETE_COLUMN: return [3 /*break*/, 3];
                }
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, board_model_1.Board.findByIdAndUpdate(id, { $push: { columns: { columnId: body.columns[0] } } }, { new: true })];
            case 2:
                b = _b.sent();
                return [2 /*return*/, _.last(b.columns)];
            case 3: return [4 /*yield*/, board_model_1.Board.updateOne({ _id: id }, { $pull: { columns: { columnId: mongoose_1.Types.ObjectId(body.columns[0]) } } }, { upsert: false, new: true })];
            case 4:
                _b.sent();
                return [2 /*return*/];
            case 5: return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateBoard = updateBoard;
var addColumn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, bgColor, user, createdColumn, columnArrItem, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, bgColor = _a.bgColor;
                user = req['user'];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, boardColumn_model_1.Column.create({
                        name: name,
                        bgColor: bgColor,
                        createdBy: user._id,
                        boardId: req.params.boardId,
                    })];
            case 2:
                createdColumn = _b.sent();
                return [4 /*yield*/, (0, exports.updateBoard)(req.params.boardId, {
                        type: updateItemType.ADD_COLUMN,
                        columns: [createdColumn._id],
                    })];
            case 3:
                columnArrItem = _b.sent();
                res.status(201).send({
                    message: 'Sucessfully created board column',
                    column: createdColumn,
                    columnArrItem: columnArrItem,
                });
                return [2 /*return*/];
            case 4:
                e_1 = _b.sent();
                console.log(e_1);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed to create board column', res);
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addColumn = addColumn;
var changeColumnMetaData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, bgColor, obj, column, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, bgColor = _a.bgColor;
                obj = {};
                if (name)
                    obj.name = name;
                if (bgColor)
                    obj.bgColor = bgColor;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, boardColumn_model_1.Column.findByIdAndUpdate(req.params.columnId, __assign({}, obj), { new: true })];
            case 2:
                column = _b.sent();
                res.status(202).send({ column: column, message: 'Update Column Sucessfully' });
                return [2 /*return*/];
            case 3:
                e_2 = _b.sent();
                console.log(e_2);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed to create board column', res);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.changeColumnMetaData = changeColumnMetaData;
var deleteColumn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, boardColumn_model_1.Column.findByIdAndRemove(req.params.columnId)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, exports.updateBoard)(req.params.boardId, {
                        type: updateItemType.DELETE_COLUMN,
                        columns: [req.params.columnId],
                    })];
            case 2:
                _a.sent();
                res.status(202).send({ message: 'Delete Column Sucessfully' });
                return [2 /*return*/];
            case 3:
                e_3 = _a.sent();
                console.log(e_3);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed to create board column', res);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteColumn = deleteColumn;
var getColumns = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var columns, result, finalResult_1, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, boardColumn_model_1.Column.aggregate([
                        {
                            $match: { boardId: mongoose_1.Types.ObjectId(req.params.boardId) },
                        },
                        {
                            $sort: {
                                createdAt: 1,
                            },
                        },
                    ])
                    // const itemArr = columns.items
                ];
            case 1:
                columns = _a.sent();
                return [4 /*yield*/, boardColumn_model_1.Column.populate(columns, [{ path: 'items.item' }])];
            case 2:
                result = _a.sent();
                finalResult_1 = {};
                result.map(function (column) {
                    var itemArr = column.items.map(function (i) { return ({ _id: i._id, item: i.item._id }); });
                    finalResult_1[column._id] = __assign(__assign({}, column), { items: {}, itemArr: itemArr });
                    column.items.map(function (_a, i) {
                        var item = _a.item;
                        finalResult_1[column._id].items[item._id] = item;
                    });
                });
                res.status(200).send({ columns: __assign({}, finalResult_1) });
                return [2 /*return*/];
            case 3:
                e_4 = _a.sent();
                console.log(e_4);
                (0, auth_middleware_1.sendResponseError)(500, 'Failed to fetch board columns', res);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getColumns = getColumns;
var changeItemPositionInSameContainer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var items, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                items = req.body.items;
                console.log({ items: items });
                return [4 /*yield*/, boardColumn_model_1.Column.findByIdAndUpdate(req.params.columnId, { items: items })
                    // console.log({columns, c: c.columns})
                ];
            case 1:
                _a.sent();
                // console.log({columns, c: c.columns})
                res.send('Sucessfully change item position in same container');
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                console.log(e_5);
                (0, auth_middleware_1.sendResponseError)(500, 'Faied to change item position in same container', res);
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.changeItemPositionInSameContainer = changeItemPositionInSameContainer;
var changeItemPositionInDiffrentContainer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sourceColumbId, sourceItems, destinationColumbId, destinationItems, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, sourceColumbId = _a.sourceColumbId, sourceItems = _a.sourceItems, destinationColumbId = _a.destinationColumbId, destinationItems = _a.destinationItems;
                return [4 /*yield*/, boardColumn_model_1.Column.findByIdAndUpdate(sourceColumbId, {
                        items: sourceItems,
                    })];
            case 1:
                _b.sent();
                return [4 /*yield*/, boardColumn_model_1.Column.findByIdAndUpdate(destinationColumbId, {
                        items: destinationItems,
                    })
                    // console.log({columns, c: c.columns})
                ];
            case 2:
                _b.sent();
                // console.log({columns, c: c.columns})
                res.send('Sucessfully change item position in same container');
                return [3 /*break*/, 4];
            case 3:
                e_6 = _b.sent();
                console.log(e_6);
                (0, auth_middleware_1.sendResponseError)(500, 'Faied to change item position in same container', res);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.changeItemPositionInDiffrentContainer = changeItemPositionInDiffrentContainer;
