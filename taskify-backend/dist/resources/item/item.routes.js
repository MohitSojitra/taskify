"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var item_controller_1 = require("./item.controller");
var item_middleware_1 = require("./item.middleware");
var router = (0, express_1.Router)();
router.route('/:boardId/column/:columnId/item').post([item_middleware_1.verifyMember], item_controller_1.createItem);
router
    .route('/:boardId/column/:columnId/item/:itemId')
    .get(item_controller_1.getItemById)
    .put([item_middleware_1.verifyMember], item_controller_1.updateItemById)
    .delete([item_middleware_1.verifyMember], item_controller_1.deleteItemById);
router
    .route('/:boardId/column/:columnId/item/:itemId/comment')
    .get([item_middleware_1.verifyMember], item_controller_1.getAllComment)
    .post([item_middleware_1.verifyMember], item_controller_1.createComment);
router
    .route('/:boardId/column/:columnId/item/:itemId/comment/:commentId')
    .delete([item_middleware_1.verifyMember], item_controller_1.deleteComment);
// router.route("/:id/addMember")
//     .post([verifyBoardOwner] , addMemberInBoard)
exports.default = router;
