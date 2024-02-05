import * as dotenv from "dotenv"
dotenv.config()
import Koa from "koa"
import appRouter from "./routes"
import responseMiddleware from "./middlewares/responseMiddleware"
import DB from "./database/mysql/models/sequelize"
import errorHandler from "./middlewares/errorHandler"
import bodyParser from "koa-bodyparser"

const app = new Koa()
app.use(bodyParser())
app.use(responseMiddleware)
app.use(errorHandler)
app.context.db = DB.getInstance()
app.use(appRouter.routes()).use(appRouter.allowedMethods())
  
app.listen(3000)