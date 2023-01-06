"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "results", // table name
        "xp", // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn("results", "xp")]);
  },
};
