import express from "express"
import { sendResponseError } from "../../utils/auth.middleware";
import { User } from "../user/user.model"
import bcrypt from "bcrypt"
import { checkPassword, newToken } from "../../utils/utility.function";
export const signup = async (req:express.Request , res : express.Response) => {
    const { password } = req.body
    try {
        const hash = await  bcrypt.hash(password, 8)
        await User.create({...req.body , password: hash})
        res.status(201).send("Sucessfully account opened ");
        return
    }
    catch (err)
    {
        sendResponseError(500, "Something wrong please try again", res)
        return
    }
}

export const signin = async (req: express.Request, res: express.Response) => {
    const {  password , user } = req.body
    try {
        const same = await checkPassword(password, user.password)
        if (same) {
            let token = newToken(user);
            res.status(200).send({ status: "ok", token })
            return 
        }
        sendResponseError(400 , "InValid password !" , res)
    }
    catch (err)
    {
        console.log(err)
        sendResponseError(500 , `Error ${err}` , res)
    }
}   