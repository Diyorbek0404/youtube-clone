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
}

export default new VideoController
