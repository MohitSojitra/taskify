"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var commentSchema = new mongoose_1.default.Schema({
    item: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'item',
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
    },
    message: { type: String, required: true },
}, {
    timestamps: true,
});
var itemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    boardId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'board',
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    bgColor: {
        type: String,
        default: '#FFF',
    },
    description: {
        type: String,
    },
    comments: [commentSchema],
}, {
    timestamps: true,
});
exports.Item = mongoose_1.default.model('item', itemSchema);
