"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_middleware_1 = require("./../item/item.middleware");
var express_1 = require("express");
var boardColumn_controller_1 = require("./boardColumn.controller");
var router = (0, express_1.Router)();
router
    .route('/:boardId/column')
    .get([item_middleware_1.verifyMember], boardColumn_controller_1.getColumns)
    .post([item_middleware_1.verifyMember], boardColumn_controller_1.addColumn);
router
    .route('/:boardId/column/:columnId')
    .put([item_middleware_1.verifyMember], boardColumn_controller_1.changeColumnMetaData)
    .delete([item_middleware_1.verifyMember], boardColumn_controller_1.deleteColumn);
router
    .route('/:boardId/column/:columnId/changeItemPositionInSameContainer')
    .post([item_middleware_1.verifyMember], boardColumn_controller_1.changeItemPositionInSameContainer);
router
    .route('/:boardId/column/changeItemPositionInDiffrentContainer')
    .post([item_middleware_1.verifyMember], boardColumn_controller_1.changeItemPositionInDiffrentContainer);
exports.default = router;
