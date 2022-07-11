import {Router} from "express";
const router  = new Router()
import UserRouter from "./UserRouter.js"
import VideoRouter from "./VideoRouter.js"

router.use("/auth", UserRouter)
router.use("/post", VideoRouter)

export default router