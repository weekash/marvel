import Router from "@koa/router"
import authMiddleware from "../middlewares/authMiddleware"
import AuthController from "../controllers/AuthController"
import validationMiddleware from "../middlewares/validationMiddleware"
import AuthSchema from "../schema/AuthSchema"

const router = new Router() 

router.post("/signup",validationMiddleware(AuthSchema.signUpUser),AuthController.signUpUser)

router.post("/signin",validationMiddleware(AuthSchema.signInUser),AuthController.signInUser)

export default router