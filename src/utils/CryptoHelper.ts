import * as crypto from "crypto"
class CryptoHelper {
    static createHash(str:string, algo:'sha256'|'md5'='sha256', salt:string=''){
        const hash = crypto.createHash(algo)
        hash.update(str+salt)
        return hash.digest('hex')
    }

    static createPasswordHash(str:string){
        const hash = crypto.createHash("sha256")
        hash.update(str+process.env.PASSWORD_SALT)
        return hash.digest('hex')
    }

}

export default CryptoHelper;