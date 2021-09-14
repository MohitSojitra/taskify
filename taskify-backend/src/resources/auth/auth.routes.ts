import  { Router } from 'express'
import { validateAuthInput } from '../../utils/auth.middleware'

import {signup,signin} from "./auth.controller"

const router = Router()

// router.route("/")
//     .get((req: express.Request, res: express.Response) => {
//         res.status(200).send("Hello World")
//     })

router.route("/signup")
    .post([validateAuthInput], signup)

router.route("/signin")
    .post([validateAuthInput], signin)
export default router