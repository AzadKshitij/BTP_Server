"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "errors", // table name
        "email", // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "@iitj.ac.in",
        }
      ),
      queryInterface.addColumn(
        "errors", // table name
        "userId", // new field name
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
    return Promise.all([queryInterface.removeColumn("errors", "email")]);
  },
};
