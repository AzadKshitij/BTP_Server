"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shop.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      value: {
        type: DataTypes.ARRAY(
          DataTypes.ARRAY(DataTypes.STRING, DataTypes.STRING)
        ),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "shops",
      modelName: "Shop",
    }
  );
  return shop;
};
