import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    name: String
}, {
     timestamps: true 
})



export const User = mongoose.model('user', userSchema)