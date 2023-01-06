"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Errors extends Model {
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
  Errors.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Solder_Break: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Non_Standard: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Forgets_To_Buy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Doesnt_Meet_Specs: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Circuit_Doesnt_Match: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Component_Damage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "errors",
      modelName: "Error",
    }
  );
  return Errors;
};
