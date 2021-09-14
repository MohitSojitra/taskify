import mongoose from 'mongoose'

interface itemInterface {
  itemId: mongoose.Schema.Types.ObjectId
}

export interface boardColumnType {
  name: string
  createdBy: mongoose.Schema.Types.ObjectId
  boardId: mongoose.Schema.Types.ObjectId
  items: [itemInterface]
  bgColor: string
  _id: mongoose.Schema.Types.ObjectId
}
