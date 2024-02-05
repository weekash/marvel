import * as dotenv from "dotenv"
dotenv.config()
import app from "./app"
const port: string = process.env.PORT!
app.listen(port,undefined,()=>{
    console.log(`Server listening on PORT ${port}`)
})

