'use strict';
const dotenv = require("dotenv")
dotenv.config()
const crypto = require("crypto")

function createPasswordHash(str){
  const hash = crypto.createHash("sha256")
  hash.update(str+process.env.PASSWORD_SALT)
  return hash.digest('hex')
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.query(`
     insert into users (userId, name, email, password, phone) values 
     ('${crypto.randomUUID()}','user1','user1@mail.com','${createPasswordHash('user1@mail.com')}','+91-1111111111'),
     ('${crypto.randomUUID()}','user2','user2@mail.com','${createPasswordHash('user2@mail.com')}','+91-2222222222'),
     ('${crypto.randomUUID()}','user3','user3@mail.com','${createPasswordHash('user3@mail.com')}','+91-3333333333'),
     ('${crypto.randomUUID()}','user4','user4@mail.com','${createPasswordHash('user4@mail.com')}','+91-4444444444'),
     ('${crypto.randomUUID()}','user5','user5@mail.com','${createPasswordHash('user5@mail.com')}','+91-5555555555')
     `,)
  },

  async down (queryInterface) {
     await queryInterface.bulkDelete('users',{});
  }
};
