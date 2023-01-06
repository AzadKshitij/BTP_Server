"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
    }

    toJSON() {
      return { ...this.get(), userId: undefined, id: undefined };
    }
  }
  Result.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      money: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      xp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rollNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "results",
      modelName: "Result",
    }
  );
  return Result;
};
