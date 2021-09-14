import express from 'express'
import {Types} from 'mongoose'
import {sendResponseError} from '../../utils/auth.middleware'
import {Board} from '../board/board.model'
import {Item} from './item.model'
export const verifyMember = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user = req['user']
  try {
    const findMatch = await Board.aggregate([
      {
        $unwind: {path: '$member'},
      },
      {
        $match: {
          'member.userId': Types.ObjectId(user._id),
          _id: Types.ObjectId(req.params.boardId),
        },
      },
    ])

    if (findMatch.length <= 0) {
      sendResponseError(500, 'you are not member of the board ', res)
      return
    }
  } catch (e) {
    sendResponseError(500, 'Some thing went wrong!', res)
    return
  }

  next()
}
