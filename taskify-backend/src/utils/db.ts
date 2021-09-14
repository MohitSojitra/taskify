import mongoose from 'mongoose'
import options from '../config'

export const connect = (url:string = options.dbUrl, opts:object = {}) => {
  return mongoose.connect(
      url,
    { ...opts, useNewUrlParser: true }
  )
}
