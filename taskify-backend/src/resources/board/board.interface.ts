import mongoose from "mongoose";

interface memberInterface {
    userId :mongoose.Schema.Types.ObjectId
}

export interface BoardType {
    name: string,
    createdBy: mongoose.Schema.Types.ObjectId,
    bgColor: string,
    member : [memberInterface],
    _id: mongoose.Schema.Types.ObjectId
}