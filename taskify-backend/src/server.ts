import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import config from './config'
import {connect} from './utils/db'
import authRouter from './resources/auth/auth.routes'
import userRouter from './resources/user/user.routes'
import boardRoute from './resources/board/board.routes'
import itemRoute from './resources/item/item.routes'
import columnRouter from './resources/boardColumn/boardColumn.routes'
import {protect} from './utils/auth.middleware'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send(`List of users`)
})

app.use('/auth', authRouter)

app.use(protect)
app.use('/user', userRouter)
app.use('/board', boardRoute)
app.use('/board-column', columnRouter)
app.use('/board-item', itemRoute)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`server listen at ${config.port} 🔥 😻 `)
    })
  } catch (err) {
    console.log('Eror in conecting.... ', err)
  }
}
