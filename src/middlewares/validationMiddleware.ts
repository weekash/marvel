import { Context, Next } from "koa";
import {ZodError, ZodTypeAny, z} from "zod"
const validationMiddleware = (schema:z.ZodObject<any,any,any>)=>async(ctx:Context, next:Next)=>{
    try{
       const validatedData =  schema.parse(ctx.request.body)
       ctx.validatedData = validatedData
    }catch(err){
        if(err instanceof ZodError){
            return ctx.sendError(400,"Validation Error", err)
        }
    }
    await next()
}

export default validationMiddleware