import { Context, Next } from "koa";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

class AuthController {
    static async signUpUser(ctx:Context,next:Next){
        const body = ctx.validatedData
        const user = await UserService.createUser(body)
        ctx.sendResponse(200,user)
        await next()
    }
    static async signInUser(ctx:Context,next:Next){
        const {email, password} = ctx.validatedData
        const token = await AuthService.signInUserByEmail(email, password)        
        ctx.sendResponse(200,{token})
        await next()
    }
}

export default AuthController