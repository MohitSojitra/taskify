import {Types} from 'mongoose'
import express from 'express'
import {sendResponseError} from '../../utils/auth.middleware'
import {Board} from '../board/board.model'
import {Column} from './boardColumn.model'
import * as _ from 'lodash'
const updateItemType = {
  ADD_COLUMN: 'ADD_COLUMN',
  DELETE_COLUMN: 'DELTE_COLUMN',
}

export const me = (req: express.Request, res: express.Response) => {
  res.status(200).send(req['user'])
}

export const updateBoard = async (
  id: string,
  body: {type: string; columns: Array<string>},
) => {
  switch (body.type) {
    case updateItemType.ADD_COLUMN:
      const b: any = await Board.findByIdAndUpdate(
        id,
        {$push: {columns: {columnId: body.columns[0]}}},
        {new: true},
      )
      return _.last(b.columns)
      break
    case updateItemType.DELETE_COLUMN:
      await Board.updateOne(
        {_id: id},
        {$pull: {columns: {columnId: Types.ObjectId(body.columns[0])}}},
        {upsert: false, new: true},
      )
      return
      break
    default:
      break
  }
}

export const addColumn = async (
  req: express.Request,
  res: express.Response,
) => {
  const {name, bgColor} = req.body
  const user = req['user']

  try {
    const createdColumn = await Column.create({
      name,
      bgColor,
      createdBy: user._id,
      boardId: req.params.boardId,
    })
    const columnArrItem = await updateBoard(req.params.boardId, {
      type: updateItemType.ADD_COLUMN,
      columns: [createdColumn._id],
    })
    res.status(201).send({
      message: 'Sucessfully created board column',
      column: createdColumn,
      columnArrItem,
    })
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed to create board column', res)
    return
  }
}

export const changeColumnMetaData = async (
  req: express.Request,
  res: express.Response,
) => {
  const {name, bgColor} = req.body

  let obj: {name?: String; bgColor?: String} = {}
  if (name) obj.name = name
  if (bgColor) obj.bgColor = bgColor

  try {
    const column = await Column.findByIdAndUpdate(
      req.params.columnId,
      {...obj},
      {new: true},
    )
    res.status(202).send({column, message: 'Update Column Sucessfully'})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed to create board column', res)
    return
  }
}

export const deleteColumn = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    await Column.findByIdAndRemove(req.params.columnId)
    await updateBoard(req.params.boardId, {
      type: updateItemType.DELETE_COLUMN,
      columns: [req.params.columnId],
    })
    res.status(202).send({message: 'Delete Column Sucessfully'})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed to create board column', res)
    return
  }
}

export const getColumns = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const columns: any = await Column.aggregate([
      {
        $match: {boardId: Types.ObjectId(req.params.boardId)},
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ])

    // const itemArr = columns.items

    const result: any = await Column.populate(columns, [{path: 'items.item'}])
    const finalResult = {}
    result.map(column => {
      let itemArr = column.items.map(i => ({_id: i._id, item: i.item._id}))
      finalResult[column._id] = {...column, items: {}, itemArr: itemArr}
      column.items.map(({item}, i) => {
        finalResult[column._id].items[item._id] = item
      })
    })

    res.status(200).send({columns: {...finalResult}})
    return
  } catch (e) {
    console.log(e)
    sendResponseError(500, 'Failed to fetch board columns', res)
    return
  }
}

export const changeItemPositionInSameContainer = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const {items} = req.body
    console.log({items})

    await Column.findByIdAndUpdate(req.params.columnId, {items})
    // console.log({columns, c: c.columns})
    res.send('Sucessfully change item position in same container')
  } catch (e) {
    console.log(e)
    sendResponseError(
      500,
      'Faied to change item position in same container',
      res,
    )
    return
  }
}

export const changeItemPositionInDiffrentContainer = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const {sourceColumbId, sourceItems, destinationColumbId, destinationItems} =
      req.body

    await Column.findByIdAndUpdate(sourceColumbId, {
      items: sourceItems,
    })
    await Column.findByIdAndUpdate(destinationColumbId, {
      items: destinationItems,
    })
    // console.log({columns, c: c.columns})
    res.send('Sucessfully change item position in same container')
  } catch (e) {
    console.log(e)
    sendResponseError(
      500,
      'Faied to change item position in same container',
      res,
    )
    return
  }
}
