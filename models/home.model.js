module.exports = (sequelize, Sequelize) => {
  const Home = sequelize.define("home", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_url: {
      type: Sequelize.STRING(1024),
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    post_type: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
  });
  return Home;
};
