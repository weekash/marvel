import { Context, Next } from "koa";
import JWTHelper from "../utils/JWTHelper";

const authMiddleware = async(ctx:Context, next:Next)=>{

    let token = ctx.headers.authorization
    if(!token){
        return ctx.sendError(401, "UNAUTHORIZED","You are not allowed to access the resource")
    }
    token = token.split("Bearer ")[1]
    JWTHelper.verify(token)
    await next()
}

export default authMiddleware
