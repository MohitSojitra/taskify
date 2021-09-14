import express from 'express'
import {Mongoose, Types} from 'mongoose'
import {sendResponseError} from '../../utils/auth.middleware'
import {Column} from '../boardColumn/boardColumn.model'
import {User} from '../user/user.model'
import {ItemType} from './item.interface'
import {Item} from './item.model'
import * as _ from 'lodash'
const updateItemType = {
  ADD_ITEM: 'ADD_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
}

export const updateColumn = async (
  id: string,
  body: {type: string; items: Array<string>},
) => {
  switch (body.type) {
    case updateItemType.ADD_ITEM:
      const c: any = await Column.findByIdAndUpdate(
        id,
        {
          $push: {items: {item: body.items[0]}},
        },
        {new: true},
      )
      return _.last(c.items)
      break
    case updateItemType.DELETE_ITEM:
      const i = await Column.updateOne(
        {_id: id},
        {$pull: {items: {item: Types.ObjectId(body.items[0])}}},
        {upsert: false, new: true},
      )
      return
      break
    default:
      break
  }
}

export const createItem = async (
  req: express.Request,
  res: express.Response,
) => {
  const user = req['user']

  try {
    const item = await Item.create({
      createdBy: user._id,
      boardId: req.params.boardId,
      name: req.body.name,
      bgColor: req.body.color,
    })
    const itemArrItem = await updateColumn(req.params.columnId, {
      type: updateItemType.ADD_ITEM,
      items: [item._id],
    })
    res
      .status(201)
      .send({message: 'Sucessfully created item ', item, itemArrItem})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed to create item', res)
    return
  }
}

export const getItemById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const item = await Item.findById(req.params.itemId)
      .populate('boardId')
      .populate('createdBy')
    res.status(201).send({item})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed fetch item', res)
    return
  }
}

export const updateItemById = async (
  req: express.Request,
  res: express.Response,
) => {
  const obj: {name?: String; description?: String; bgColor?: String} = {}
  if (req.body.name) obj.name = req.body.name
  if (req.body.description) obj.description = req.body.description
  if (req.body.bgColor) obj.bgColor = req.body.bgColor

  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      {...obj},
      {new: true},
    )
    res.status(202).send({message: 'Update item sucessfully', item})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed fetch item', res)
    return
  }
}

export const deleteItemById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    await Item.findByIdAndRemove(req.params.itemId)
    await updateColumn(req.params.columnId, {
      type: updateItemType.DELETE_ITEM,
      items: [req.params.itemId],
    })
    res.status(202).send({message: 'Delete item sucessfully'})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed fetch item', res)
    return
  }
}

export const createComment = async (
  req: express.Request,
  res: express.Response,
) => {
  const user = req['user']
  try {
    const item: any = await Item.findByIdAndUpdate(
      req.params.itemId,
      {
        $push: {
          comments: {
            item: req.params.itemId,
            author: user._id,
            message: req.body.message,
          },
        },
      },
      {new: true},
    )
    // const result = await Item.populate(item, [
    //   {path: 'comment.author'},
    //   {path: 'comment.'},
    // ])

    res.status(201).send({
      message: 'Comment added sucessfully ',
      comment: {
        message: req.body.message,
        createdAt: new Date().getTime(),
        _id: item.comments[0]._id,
      },
    })
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed to create Comment', res)
    return
  }
}

export const deleteComment = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    //TODO: Delete commnet code goes to here...
    await Item.updateOne(
      {_id: req.params.itemId},
      {$pull: {comments: {_id: Types.ObjectId(req.params.commentId)}}},
      {upsert: false, new: true},
    )
    res.status(200).send({
      message: 'SuccessFully Removed Comment. ',
    })
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed to create Comment', res)
    return
  }
}

export const getAllComment = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    //TODO: Delete commnet code goes to here...
    const i: any = await Item.findById(req.params.itemId)
    res.status(200).send({
      message: 'SuccessFully fetch all comment. ',
      comments: _.reverse(i.comments),
    })
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed get all comment', res)
    return
  }
}
