module.exports = (sequelize, Sequelize) => {
  const Sponsors = sequelize.define("sponsors", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    url: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    image: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    type: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    }
  });
  return Sponsors;
};
