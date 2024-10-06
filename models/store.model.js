module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("store", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location_lat: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      location_lng: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  
    return Store;
  };
  