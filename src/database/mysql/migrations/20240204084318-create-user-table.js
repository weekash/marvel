'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      userId: {
        type: new DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(50),
      },
      email: {
        type: new DataTypes.STRING(100),
        unique: true,
        allowNull: false
      },
      password: {
        type: new DataTypes.STRING(256),
        allowNull: true,
      },
      phone: {
        type: new DataTypes.STRING(20),
        unique: true,
      },
      createdAt: {
        type: new DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: new DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        allowNull: true,
        type: new DataTypes.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  }
};
