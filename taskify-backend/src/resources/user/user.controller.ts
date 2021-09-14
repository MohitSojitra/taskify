import express from 'express'
export const me = (req: express.Request, res: express.Response) => {
  res.status(200).send(req['user'])
}
