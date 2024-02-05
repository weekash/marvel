import { Sequelize } from "sequelize";
import initUser from "./User";
class DB {
    public sequelize: Sequelize;
    public static instance: DB;
    public User: any;
    constructor() {
        this.sequelize = new Sequelize({
            host: process.env.DB_HOST!,
            port: +process.env.DB_PORT!,
            username: process.env.DB_USERNAME!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_DATABASE!,
            dialect:"mysql",
            dialectModule: require("mysql2")
        })

        initUser(this.sequelize)

        this.User = this.sequelize.models.users;
    }
    public static getInstance(): DB {
        if (!DB.instance) {
            DB.instance = new DB();
        }

        return DB.instance;
    }
}

export default DB