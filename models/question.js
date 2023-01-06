"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), userId: undefined, id: undefined };
    }
  }
  Question.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      problem: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(["Inferno", "Hardest", "Hard", "Medium", "Easy"]),
        allowNull: false,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          return JSON.parse(this.getDataValue("data"));
        },
        set(value) {
          return this.setDataValue("data", JSON.stringify(value));
        },
      },
    },
    {
      sequelize,
      tableName: "questions",
      modelName: "Question",
    }
  );
  return Question;
};
