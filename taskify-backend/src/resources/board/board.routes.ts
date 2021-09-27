import {verifyMember} from './../item/item.middleware'
import {Router} from 'express'
import {
  addMemberInBoard,
  changeColumbPosition,
  createBoard,
  deleteBoardById,
  getBoardById,
  getMyBoards,
  me,
  removeMemberInBoard,
  updateBoardById,
} from './board.controller'
import {verifyBoardOwner} from './board.middleware'
const router = Router()

router.route('/').get(getMyBoards).post(createBoard)

router
  .route('/:id')
  .get(getBoardById)
  .put([verifyBoardOwner], updateBoardById)
  .delete([verifyBoardOwner], deleteBoardById)

router.route('/:id/addMember').post([verifyBoardOwner], addMemberInBoard)
router.route('/:id/removeMember').post([verifyBoardOwner], removeMemberInBoard)

router
  .route('/:boardId/changeColumbPosition')
  .post([verifyMember], changeColumbPosition)

export default router
