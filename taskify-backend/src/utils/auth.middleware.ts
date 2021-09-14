import express from "express"
import { User } from "../resources/user/user.model";
import { verifyToken } from "./utility.function";

export const sendResponseError =  ( statusCode : number  ,msg : String , res :express.Response , ) => {
    res.status(statusCode || 400).send( !!msg ? msg : "Invalid input !!")
}

export const validateAuthInput = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.hostname , req.originalUrl)
    const { name, email, password } = req.body;

    
    if (!!!email || !!!password)
    {
        sendResponseError(400, "Invalid Input", res)
        return
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!emailRegex.test(String(email).toLowerCase()))
    {
        sendResponseError(400, "please enter valid email", res)
        return
    }

    if (password.length < 8)
    {
        sendResponseError(400, "password have must 8 charecter", res)
        return 
    }

    const user = await User.findOne({ email: email })

    if (req.originalUrl.includes("signup")) {
        if (!!user) {
            sendResponseError(400, "account alerady open with this email ", res)
            return
        }
    }
    else if (req.originalUrl.includes("signin")) {
        if (!!!user)
        {
            sendResponseError(400 , "email not exist !" , res)    
        }
        else {
            req.body.user = user
        }
    }
    next()
}


export const protect = async (req:express.Request , res :express.Response , next:express.NextFunction) => {
    const { authorization } = req.headers
    if (!authorization){
        sendResponseError(400, "You are not authorized ", res)
        return
    }
    else if (!authorization.startsWith("Bearer ")) {
        sendResponseError(400, "You are not authorized ", res)
        return 
    }

    try {
        const payload :any = await verifyToken(authorization.split(" ")[1])
        console.log(payload)
        if (payload)
        {
            const user = await User.findById(payload.id)
            req["user"] = user
            // req.push({user : user})
            next()
        }
        else {
            sendResponseError(400 , `you are not authorizeed` , res)
        }
    }
    catch (err){
        console.log("Error ", err)
        sendResponseError(400 , `Error ${err}` , res)
    }
    
    
}