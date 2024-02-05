# Marvel Character Search
This repo includes API's to login, signup user and after login it will allow you to search for marvel characters. 

#### Tech Used
Koa, MySQL, Sequelize, Jest, Axios, Typescript, Swagger

### How to run the app
1. Clone the repo `git clone https://github.com/weekash/marvel.git`
2. Run `npm install` in the root.
2. Now we will setup our database
3. Install sequelize-cli globally `npm i -g sequelize-cli` this will help us to run or migration and seeders.
4. Init sequelize-cli by running this `sequelize-cli --init`. This will create required config.json file in path `src/database/mysql/config/config.json`. 
5. Now by default you will be in development mode so add required credentials to `config.json` under **development** object
6. Now run migrations `sequelize db:migrate`. If you want to undo/reset then `sequelize db:migrate:undo --name=name_of_migration.js` or `sequelize db:migate:undo:all`
7. Optionally you can run seeders this will give you a set of users using command `sequelize db:seed:all`. If you want to undo/reset then `sequelize db:seed:undo` or `sequelize db:migate:undo:all`
8. The users starts from  **user1@mail.com** to **user5@mail.com**. They have password same as their email. 
8. Now in the root create `.env` file and copy the content of `.env.example` and provide them possible values. 
9. Now you are good to go. Use this command to run your app. `npm run dev`
10. Your server will start. For now we have the following routes for access

| path    | method | Auth required| Body|
| -------- | ------- | --------- |-----|
| /auth/signup  | POST    | No | `{name:"asdf",email:"asdf@mail.com",password:"abc",phone:"111111111"}` all required
| /auth/signin | POST     | No | {email,password}
| /characters?search=query    | GET    | Yes | NA

Above information is also available on `/docs` route let say if you are on port 3000 then you can view docs at `http://localhost:3000/docs`


### Why Koa
I was going with defacto framework Express but Express and Fastify are something which I have worked on. While building this project, I want to learn something new so I went with Koa.


### Parts that can be further improved
1. Need to check some packages dedicated to Koa that can merge routing + documentation.
2. Koa context when applied with middlewares does not merge the TS types. Need some workaround this. 
3. Need to find out, how to test Repository, Services, Controllers in complete isolation.

