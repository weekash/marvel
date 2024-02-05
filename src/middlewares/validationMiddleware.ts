import { Context, Next } from "koa";
import {ZodError, ZodTypeAny, z} from "zod"
const validationMiddleware = (schema:z.ZodObject<any,any,any>)=>async(ctx:Context, next:Next)=>{
    try{
       const validatedData =  schema.parse(ctx.request.body)
       ctx.validatedData = validatedData
    }catch(err:any){
        console.log(err?.message)
        if(err instanceof ZodError){
            return ctx.sendError(400,"VALIDATION_ERROR", "Invalid Payload")
        }
    }
    await next()
}

export default validationMiddleware