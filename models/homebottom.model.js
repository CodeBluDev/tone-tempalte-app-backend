module.exports = (sequelize, Sequelize) => {
  const HomeBottom = sequelize.define("homebottom", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: Sequelize.STRING(1024),
      notEmpty: true,
      notNull: true,
      unique: false,
    },
  });
  return HomeBottom;
};
