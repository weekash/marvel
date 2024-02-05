import { Next, Context } from "koa";
import CharacterService from "../services/CharacterService";

class CharacterController {
    static async searchCharacter(ctx:Context, next:Next){
        const query = ctx.request.query.search
        let q = Array.isArray(query) ? query[0] : (query || "")
        const response = await CharacterService.findCharacters(q)
        ctx.sendResponse(200,response)
        await next();
    }
}

export default CharacterController