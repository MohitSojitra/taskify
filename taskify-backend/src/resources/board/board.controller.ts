import express from 'express'
import {Types} from 'mongoose'
import {sendResponseError} from '../../utils/auth.middleware'
import {User} from '../user/user.model'
import {Board} from './board.model'
export const me = (req: express.Request, res: express.Response) => {
  res.status(200).send(req['user'])
}

export const createBoard = async (
  req: express.Request,
  res: express.Response,
) => {
  const {name, bgColor} = req.body
  const user = req['user']
  try {
    const board = await Board.create({
      name,
      createdBy: user._id,
      bgColor,
      member: {userId: user._id},
    })
    const result = await Board.populate(board, [
      {path: 'member.userId'},
      {path: 'createdBy'},
    ])
    res.status(201).send({board: result, message: 'Sucessfully created board '})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed to create board', res)
    return
  }
}

export const getBoardById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const board = await Board.findById(req.params.id).populate('member.userId')
    res.status(200).send({board})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(
      500,
      'Faied to fecth boared in database. please try again',
      res,
    )
    return
  }
}

export const getMyBoards = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    console.log({user: req['user']._id})
    const board: any = await Board.aggregate([
      {
        $unwind: {path: '$member'},
      },
      {
        $match: {'member.userId': Types.ObjectId(req['user']._id)},
      },
      {
        $group: {
          _id: '$_id',
        },
      },
      {
        $lookup: {
          from: 'boards',
          localField: '_id',
          foreignField: '_id',
          as: 'boards',
        },
      },
      {
        $project: {
          boards: 1,
          _id: 0,
        },
      },
      {
        $unwind: {
          path: '$boards',
        },
      },
    ])

    // console.log({board: board})
    const resData = board.map(r => {
      return {...r.boards, columnArr: r.boards.columns}
    })

    const result: any = await Board.populate(resData, [
      {path: 'member.userId'},
      {path: 'createdBy'},
    ])

    res.status(200).send({board: result})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(
      500,
      'Faied to fecth boared in database. please try again',
      res,
    )
    return
  }
}

export const deleteBoardById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    await Board.findByIdAndRemove(req.params.id)
    res.status(200).send('delete board sucessfully')
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Faied to delete board. please try again', res)
    return
  }
}

export const updateBoardById = async (
  req: express.Request,
  res: express.Response,
) => {
  const obj: {name?: string; bgColor?: string} = {}
  if (req.body.name) {
    obj.name = req.body.name
  }
  if (req.body.bgColor) {
    obj.bgColor = req.body.bgColor
  }

  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {...obj},
      {new: true},
    )
    res.status(200).send({board, message: 'Sucessfully update board'})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(
      500,
      'Faied to fecth boared in database. please try again',
      res,
    )
    return
  }
}

export const addMemberInBoard = async (
  req: express.Request,
  res: express.Response,
) => {
  //TODO: check email is register in website
  //TODO: check already not added invited user
  //TODO: add user in board

  const {email} = req.body

  try {
    const invitedUser = await User.findOne({email})
    if (!invitedUser) {
      sendResponseError(
        500,
        'User Not Register with this email, please invite user threw link. ',
        res,
      )
    }

    console.log({invitedUser})
    const findMatch = await Board.aggregate([
      {
        $match: {_id: Types.ObjectId(req.params.id)},
      },
      {
        $unwind: {path: '$member'},
      },
      {
        $match: {'member.userId': Types.ObjectId(invitedUser._id)},
      },
    ])
    console.log({findMatch})
    if (findMatch.length > 0) {
      sendResponseError(500, 'User already added in board ', res)
      return
    }

    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {$push: {member: {userId: invitedUser._id}}},
      {new: true},
    )
    const result: any = await Board.populate(board, [{path: 'member.userId'}])

    res.send({member: result.member, message: 'Sucessfully add member'})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(
      500,
      'Faied to fecth boared in database. please try again',
      res,
    )
    return
  }
}

export const removeMemberInBoard = async (
  req: express.Request,
  res: express.Response,
) => {
  //TODO: check email is register in website
  //TODO: check already not added invited user
  //TODO: add user in board

  const {memberUserId} = req.body

  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {$pull: {member: {userId: Types.ObjectId(memberUserId)}}},
      {upsert: false, new: true},
    )

    const result: any = await Board.populate(board, [{path: 'member.userId'}])

    res.send({member: result.member, message: 'Sucessfully delete member'})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(
      500,
      'Faied to fecth boared in database. please try again',
      res,
    )
    return
  }
}

export const changeColumbPosition = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const {columns} = req.body

    const c: any = await Board.findByIdAndUpdate(
      req.params.boardId,
      {columns},
      {new: true},
    )
    // console.log({columns, c: c.columns})
    res.send('Sucessfully Columb changed')
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Faied to chnage Columb', res)
    return
  }
}
