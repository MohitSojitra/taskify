import mongoose from "mongoose";

export interface UserType {
    name: string,
    email: string,
    password: string,
    _id: mongoose.Schema.Types.ObjectId
}