import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    videoPoster:{
        type:String,
        required:true
    },
    videoUri:{
        type:String,
        required:true
    },
    videoContent:{
        type:String,
        required:true
    },
    videoView:{
        type:Number,
    },
    videoLikes:{
        type:Array,
        default:[]
    },
    comments:[{
        userId:String,
        username:String,
        text:String
    }],
    channelImage:{
        type:String,
        required:true
    },
    channelName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    rekommendationVideo:[{
        videoId:String,
        posterPhoto:String,
        channelImage:String,
        view:Number,
        channelName:String,
        textContent:String,
        createAt:String
    }],
    videoDescription:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

export default mongoose.model("Video", VideoSchema)