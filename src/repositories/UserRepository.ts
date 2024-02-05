import * as crypto from "crypto"
import DB from "../database/mysql/models/sequelize";
import CryptoHelper from "../utils/CryptoHelper";

interface CreateUser{
    name: string;
    email: string;
    password: string;
    phone: string;
}

const db = DB.getInstance()
class UserRepository {
    
    static async createUser(user:CreateUser){
        return await db.User.create({
            userId: crypto.randomUUID(),
            ...user,
            password: CryptoHelper.createPasswordHash(user.password),
        })
    }

    static async getUserByEmail(email:string){
        return await db.User.findOne({
            where:{email}
        })
    }

    static async getUserById(id:string){
        return await db.User.findByPk(id)
    }
}

export default UserRepository