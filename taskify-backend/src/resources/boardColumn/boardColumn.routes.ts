import {verifyMember} from './../item/item.middleware'
import {Router} from 'express'

import {
  addColumn,
  changeColumnMetaData,
  changeItemPositionInDiffrentContainer,
  changeItemPositionInSameContainer,
  deleteColumn,
  getColumns,
  me,
} from './boardColumn.controller'
const router = Router()

router
  .route('/:boardId/column')
  .get([verifyMember], getColumns)
  .post([verifyMember], addColumn)

router
  .route('/:boardId/column/:columnId')
  .put([verifyMember], changeColumnMetaData)
  .delete([verifyMember], deleteColumn)

router
  .route('/:boardId/column/:columnId/changeItemPositionInSameContainer')
  .post([verifyMember], changeItemPositionInSameContainer)
router
  .route('/:boardId/column/changeItemPositionInDiffrentContainer')
  .post([verifyMember], changeItemPositionInDiffrentContainer)

export default router
