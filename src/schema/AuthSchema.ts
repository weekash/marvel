import { z } from "zod";

const AuthSchema = {
    signUpUser: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string().min(10).max(20)
    }),
    signInUser: z.object({
        email: z.string().email(),
        password: z.string(),
    })

}

export default AuthSchema