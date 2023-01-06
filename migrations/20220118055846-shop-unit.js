"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "shops", // table name
        "unit", // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: "",
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("shops", "unit")]);
  },
};
