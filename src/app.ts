import * as dotenv from "dotenv"
dotenv.config()
import Koa from "koa"
import appRouter from "./routes"
import responseMiddleware from "./middlewares/responseMiddleware"
import DB from "./database/mysql/models/sequelize"
import errorHandler from "./middlewares/errorHandler"
import bodyParser from "koa-bodyparser"
import { koaSwagger } from 'koa2-swagger-ui';
//@ts-ignore
import * as jsonData from '../openapi.json';
const app = new Koa()
app.use(bodyParser())
app.use(responseMiddleware)
app.use(errorHandler)
app.context.db = DB.getInstance()
app.use(appRouter.routes()).use(appRouter.allowedMethods())


app.use(
    koaSwagger({
      routePrefix: '/docs', 
      swaggerOptions: {
        url: `http://localhost:${process.env.PORT}/openapi.json`, 
      },
    }),
  );

app.use(async (ctx) => {
    if (ctx.path === '/openapi.json') {
      ctx.type = 'json';
      ctx.body = jsonData;
    }
  });
export default app;
