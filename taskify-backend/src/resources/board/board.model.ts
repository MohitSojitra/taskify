import mongoose from "mongoose"

const memeberRefSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
})

const columnRefSchema = new mongoose.Schema({
    columnId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "column"
    }
})

const boardSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user"
    },

    bgColor : {
        type : String,
        default : "#FFF"
    },

    member : [ memeberRefSchema  ],

    columns : [ columnRefSchema ]
    
}, {
     timestamps: true 
})



export const Board = mongoose.model('board', boardSchema)