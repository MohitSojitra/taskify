import {Router} from 'express'
import {
  createComment,
  createItem,
  deleteComment,
  deleteItemById,
  getAllComment,
  getItemById,
  updateItemById,
} from './item.controller'
import {verifyMember} from './item.middleware'
const router = Router()

router.route('/:boardId/column/:columnId/item').post([verifyMember], createItem)

router
  .route('/:boardId/column/:columnId/item/:itemId')
  .get(getItemById)
  .put([verifyMember], updateItemById)
  .delete([verifyMember], deleteItemById)

router
  .route('/:boardId/column/:columnId/item/:itemId/comment')
  .get([verifyMember], getAllComment)
  .post([verifyMember], createComment)

router
  .route('/:boardId/column/:columnId/item/:itemId/comment/:commentId')
  .delete([verifyMember], deleteComment)
// router.route("/:id/addMember")
//     .post([verifyBoardOwner] , addMemberInBoard)

export default router
