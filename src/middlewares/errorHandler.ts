import { Next } from "koa";
import { Context } from "vm";
import CustomError from "../utils/CustomError";

const errorHandler = async(ctx:Context, next:Next)=>{
    try{
        await next()
    }catch(err:any){
        console.log(err?.message)
        if(err instanceof CustomError){
            return ctx.sendError(err.statusCode, err.errorCode, err.message)
        } else{
            return ctx.sendError(500,'SERVER_ERROR','Server Error Here')
        }
    }
}


export default errorHandler;