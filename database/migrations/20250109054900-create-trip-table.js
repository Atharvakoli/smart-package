module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("trips", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      num_people: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["male", "female", "other"]],
        },
      },
      activity_type: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      frequency: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [["light", "moderate", "intensive"]],
        },
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
    await queryInterface.dropTable("trips");
  },
};
