'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add a new column called "location" of type STRING to the "stores" table
    await queryInterface.addColumn('stores', 'location', {
      type: Sequelize.STRING,
      allowNull: true,  // Set to false if you want to enforce non-null values
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the "location" column if the migration is undone
    await queryInterface.removeColumn('stores', 'location');
  }
};
