'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename column 'media_image' to 'mediaImage' in the 'offers' table
    await queryInterface.renameColumn('offers', 'media_image', 'mediaImage');
  },

  down: async (queryInterface, Sequelize) => {
    // If we revert the migration, rename 'mediaImage' back to 'media_image'
    await queryInterface.renameColumn('offers', 'mediaImage', 'media_image');
  }
};
