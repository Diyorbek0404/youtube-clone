import ApiError from "../error/ApiError.js";
import Video from "../model/Video.js";

class VideoController {
    async createPost(req, res, next) {
        const newPost = await new Video(req.body)
        if(newPost) {
            const post = await newPost.save()
            return res.status(200).json(post)
        }
        return next(ApiError.badRequest("Post yuklashda xato"))
    }

    async getById(req, res, next) {
        const post = await Video.findById(req.params.id)
        if(post) {
            return res.status(200).json(post)
        }
        return next(ApiError.badRequest("Post topilmadi yoki xato"))
    }

    async getAll(req, res, next){
        const post = await Video.find()
        if(post) {
            return res.status(200).json(post)
        }
        return next(ApiError.badRequest("Postlar topilmadi yoki xato"))
    }

    // like function
    async likePost(req, res) {
        const post = await Video.findById(req.params.id)
        if (!post.videoLikes.includes(req.body.useId)) {
            await post.updateOne({ $push: { videoLikes: req.body.userId } })
            return res.status(200).json("bu videoni yoqtirdingiz")
        } else {
            await post.updateOne({ $pull: { videoLikes: req.body.userId } })
            return res.status(200).json("bu siz likeni olib tashladingiz")
        }
    }

    async updateVideo(req, res) {
        const post = await Video.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            next: true
        })
        return res.status(200).json(post)
    }
    async delete(req, res) {
        await Video.findByIdAndDelete(req.params.id)
        return res.status(200).json("o'chirilgan")
    }

    async addComment(req, res) {
        const newComment = {
            username: req.body.username,
            text: req.body.text,
            userId:req.body.userId,
            image: req.body.image
        }
        const post = await Video.findById(req.params.id)
        await post.updateOne({$push: {comments: newComment}})
        return res.status(200).json("sizning fikringiz qo'shildi")
    }

    async getAllComments(res) {
        const comments = await Video.comments.find()
        return res.status(200).json(comments)
    }

    async getTwoComments(req, res) {
        const comments = await Video.comments.find().sort({$natural:-1}).limit(req.params.id); 
        return res.status(200).json(comments)
    }
}

export default new VideoController