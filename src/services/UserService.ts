import UserRepository from "../repositories/UserRepository";
import AuthSchema from "../schema/AuthSchema";
import CustomError from "../utils/CustomError";

class UserService {

    static createUser = async(user:typeof AuthSchema.signUpUser['_output'])=>{
        let existingUser = await UserRepository.getUserByEmail(user.email)
        if(existingUser){
            throw new CustomError(400,'RESOURCE_EXISTS', "User already registered")
        }
       return await UserRepository.createUser(user)
    }
}

export default UserService;