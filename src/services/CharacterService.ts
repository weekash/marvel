import axios from "axios"
import CryptoHelper from "../utils/CryptoHelper"
import CustomError from "../utils/CustomError"
class CharacterService {
    public static baseUrl: string = "https://gateway.marvel.com"
    private static publicKey: string = process.env.MARVEL_PUBLIC_KEY!
    private static privateKey: string = process.env.MARVEL_PRIVATE_KEY!

    private static getHash(ts: number) {
        return CryptoHelper.createHash(`${ts}${CharacterService.privateKey}${CharacterService.publicKey}`, 'md5')
    }
    static async findCharacters(query: string) {
        const ts = new Date().valueOf()
        try {
            const response = await axios.get(`${CharacterService.baseUrl}/v1/public/characters?ts=${ts}&apikey=${CharacterService.publicKey}&hash=${CharacterService.getHash(ts)}&${query ? `nameStartsWith=${query}` : `limit=20`}`)
            return response.data.data
        } catch (err) {
            throw new CustomError(400,'INTERNAL_API_ERROR', "Error while fetching characters", err)
        }
    }
}

export default CharacterService