import { DataTypes, Sequelize } from "sequelize";

export default function initUser(sequelize: Sequelize) {
    const User = sequelize.define(
      "users",
      {
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
      },
      {
        tableName: "users",
        modelName: "User",
        paranoid: true,
        timestamps: true,
        freezeTableName: true,
      }
    );
    return User;
  }