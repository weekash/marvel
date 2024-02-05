import Router from "@koa/router"
import authMiddleware from "../middlewares/authMiddleware"
import CharacterController from "../controllers/CharacterController"

const router = new Router() 

router.get("/", authMiddleware,CharacterController.searchCharacter)

export default router