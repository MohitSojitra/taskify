import express from "express"
import { sendResponseError } from "../../utils/auth.middleware";
import { Board } from "./board.model";
export const verifyBoardOwner =  async (req:express.Request , res :express.Response , next:express.NextFunction) => {
    
    const user = req["user"];
    const boardId = req.params.id;

    try{
        const board = await Board.findOne({createdBy : user._id , _id : boardId})
        if(!board)
        {
            sendResponseError(400 , "You are not board owner ", res)
            return
        }
    }
    catch(e)
    {
        sendResponseError(500, "Some thing went wrong!", res)
    }

    
    next()
}