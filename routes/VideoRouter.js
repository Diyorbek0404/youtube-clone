import Router from "express";
const router = new Router();
import VideoController from "../controllers/VideoController.js"

router.post("/", VideoController.createPost)
router.get("/:id", VideoController.getById)
router.get("/:id/comments", VideoController.getAllComments)
router.get("/", VideoController.getAll)
router.put("/:id/likes", VideoController.likePost)
router.put("/:id", VideoController.updateVideo)
router.delete("/:id", VideoController.delete)
router.post("/", VideoController.addComment)
router.get("/:id/comments", VideoController.getTwoComments)

export default router