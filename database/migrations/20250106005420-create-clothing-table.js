"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("clothings", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      clothing_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      temperature_min: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      temperature_max: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      activity_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ranking: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("clothings");
  },
};
