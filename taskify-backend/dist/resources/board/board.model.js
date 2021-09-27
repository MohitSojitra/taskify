"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var memeberRefSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user"
    }
});
var columnRefSchema = new mongoose_1.default.Schema({
    columnId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "column"
    }
});
var boardSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    bgColor: {
        type: String,
        default: "#FFF"
    },
    member: [memeberRefSchema],
    columns: [columnRefSchema]
}, {
    timestamps: true
});
exports.Board = mongoose_1.default.model('board', boardSchema);
