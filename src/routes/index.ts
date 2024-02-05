import Router from "@koa/router"
import authRouter from "./auth"
import characterRouter from "./character"

const appRouter = new Router() 

appRouter.use('/auth',authRouter.routes(), authRouter.allowedMethods())
appRouter.use('/characters',characterRouter.routes(), characterRouter.allowedMethods())

export default appRouter;