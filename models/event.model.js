module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
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
    short_description: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    full_description: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    stage: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    date: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    time: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    date_formatted: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    date_formatted: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    month_formatted: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    time_formatted: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    event_start_date: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    event_end_date: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    cant_miss_event: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
  });
  return Event;
};
