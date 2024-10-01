// offer.model.js
module.exports = (sequelize, Sequelize) => {
  const Offer = sequelize.define('offer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    mediaImage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  // Remove the associate function if it exists
  return Offer;
};
