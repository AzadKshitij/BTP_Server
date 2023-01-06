"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("errors", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Solder_Break: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Non_Standard: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Forgets_To_Buy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Doesnt_Meet_Specs: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Circuit_Doesnt_Match: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Component_Damage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("errors");
  },
};
