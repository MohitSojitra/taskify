"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var itemRefSchema = new mongoose_1.default.Schema({
    item: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'item',
    },
});
var boardColumnSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    boardId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'board',
    },
    items: [itemRefSchema],
    bgColor: {
        type: String,
        default: '#DCE1E7',
    },
}, {
    timestamps: true,
});
exports.Column = mongoose_1.default.model('column', boardColumnSchema);
