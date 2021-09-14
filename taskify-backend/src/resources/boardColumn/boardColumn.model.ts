import mongoose from 'mongoose'

const itemRefSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item',
  },
})

const boardColumnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'board',
    },
    items: [itemRefSchema],
    bgColor: {
      type: String,
      default: '#DCE1E7',
    },
  },
  {
    timestamps: true,
  },
)

export const Column = mongoose.model('column', boardColumnSchema)
