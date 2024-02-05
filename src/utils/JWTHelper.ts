import jwt from "jsonwebtoken"
import CustomError from "./CustomError"
class JWTHelper{

    static sign(payload:Record<string,any>){
        return jwt.sign(payload, process.env.JWT_SECRET!,{expiresIn:"2h"})
    }

    static verify(token:string){
        try{
            jwt.verify(token,process.env.JWT_SECRET!)
        }catch(err){
            throw new CustomError(401,'UNAUTHORIZED',"Invalid Token")
        }
    }
}

export default JWTHelper