import { Next } from "koa";
import { Context } from "vm";
import UserRepository from "../repositories/UserRepository";
import CustomError from "../utils/CustomError";
import CryptoHelper from "../utils/CryptoHelper";
import JWTHelper from "../utils/JWTHelper";

class AuthService {
    static async signInUserByEmail(email:string,password:string){
        let userExists = await UserRepository.getUserByEmail(email)
        if(!userExists || userExists.password != CryptoHelper.createPasswordHash(password)){
            throw new CustomError(401, 'UNAUTHORIZED',"Invalid Credentials")
        }
        const {name,phone}= userExists
        return JWTHelper.sign({name,email,phone})
    }
}

export default AuthService