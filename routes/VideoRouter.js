import Router from "express";
const router = new Router();
import VideoController from "../controllers/VideoController.js"

router.post("/", VideoController.createPost)
router.get("/:id", VideoController.getById)

export default router