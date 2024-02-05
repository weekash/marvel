import { Context, Middleware, Next } from "koa";

interface ResponseHelper {
    sendResponse: (statusCode: number, data: any) => void,
    sendError: (statusCode: number, errorCode: null | string, error: null | string) => void
}
const responseMiddleware = async (ctx: Context & ResponseHelper, next: Next) => {

        ctx.sendResponse=(statusCode, data) => {
            ctx.status = statusCode
            ctx.body = data
        },

        ctx.sendError= (statusCode, errorCode, error) => {
            ctx.status = statusCode
            ctx.body = {
                errorCode: errorCode || "SERVER_ERROR",
                error
            }
        }

    await next()
}

export default responseMiddleware