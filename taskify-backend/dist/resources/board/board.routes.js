"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_middleware_1 = require("./../item/item.middleware");
var express_1 = require("express");
var board_controller_1 = require("./board.controller");
var board_middleware_1 = require("./board.middleware");
var router = (0, express_1.Router)();
router.route('/').get(board_controller_1.getMyBoards).post(board_controller_1.createBoard);
router
    .route('/:id')
    .get(board_controller_1.getBoardById)
    .put([board_middleware_1.verifyBoardOwner], board_controller_1.updateBoardById)
    .delete([board_middleware_1.verifyBoardOwner], board_controller_1.deleteBoardById);
router.route('/:id/addMember').post([board_middleware_1.verifyBoardOwner], board_controller_1.addMemberInBoard);
router.route('/:id/removeMember').post([board_middleware_1.verifyBoardOwner], board_controller_1.removeMemberInBoard);
router
    .route('/:boardId/changeColumbPosition')
    .post([item_middleware_1.verifyMember], board_controller_1.changeColumbPosition);
exports.default = router;
