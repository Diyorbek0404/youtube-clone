import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:false
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:false
    }
}, {
    timestamps:true
})

export default mongoose.model("User", UserSchema)