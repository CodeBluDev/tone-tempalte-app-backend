module.exports = (sequelize, Sequelize) => {
  const Vendors = sequelize.define("vendors", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    location: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
  });
  return Vendors;
};