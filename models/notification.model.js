module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define("notification", {
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
    notification: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    date_time: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
  });
  return Notification;
};