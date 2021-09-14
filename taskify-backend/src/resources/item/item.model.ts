import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    message: {type: String, required: true},
  },
  {
    timestamps: true,
  },
)

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'board',
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },

    bgColor: {
      type: String,
      default: '#FFF',
    },

    description: {
      type: String,
    },

    comments: [commentSchema],
  },
  {
    timestamps: true,
  },
)

export const Item = mongoose.model('item', itemSchema)
