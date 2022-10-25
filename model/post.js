import mongoose from "mongoose";
const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subTitle:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

export default mongoose.model('Post',postSchema);