import mongoose from 'mongoose'
interface commentInterface {
  item: mongoose.Schema.Types.ObjectId
  author: mongoose.Schema.Types.ObjectId
  message: string
  _id: mongoose.Schema.Types.ObjectId
}

export interface ItemType {
  name: string
  boardId: mongoose.Schema.Types.ObjectId
  createdBy: mongoose.Schema.Types.ObjectId
  bgColor: string
  description: string
  comments: [commentInterface]
  _id: mongoose.Schema.Types.ObjectId
}
