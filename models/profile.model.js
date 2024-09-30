const crypto = require("crypto");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstname: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    lastname: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      unique: false,
    },
    email: {
      type: Sequelize.STRING,
      set: function (val) {
        this.setDataValue("email", val.toLowerCase());
      },
      isEmail: true,
      notEmpty: true,
      notNull: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      get() {
        return () => this.getDataValue("password");
      },
    },
    salt: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true,
      get() {
        return () => this.getDataValue("salt");
      },
    },
    otp: {
      type: Sequelize.STRING,
      notEmpty: false,
      notNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
      notEmpty: false,
      notNull: false,
    },
    token: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    otp_forgot: {
      type: Sequelize.STRING,
      notEmpty: false,
      notNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      notEmpty: false,
      notNull: false,
    },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    notification_status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    is_verified_email: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    plus_member: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return User;
};
