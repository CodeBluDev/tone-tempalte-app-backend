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

  User.generateSalt = function () {
    return crypto.randomBytes(16).toString("base64");
  };
  User.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash("RSA-SHA256")
      .update(plainText)
      .update(salt)
      .digest("hex");
  };

  const setSaltAndPassword = (user) => {
    if (user.changed("password")) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };User.prototype.verifyOTP = function (enteredOTP) {
  // Ensure both OTP values are strings for comparison
    console.log("Comparing OTPs: ", enterOTP, this.otp);

  return String(enteredOTP) === String(this.otp);
};


  User.prototype.verifyOTP = function (enteredOTP) {
  // Ensure both OTP values are strings for comparison
  return String(enteredOTP) === String(this.otp);
};


  User.prototype.verifyPassword = function (enteredPassword) {
    return (
      User.encryptPassword(enteredPassword, this.salt()) === this.password()
    );
  };

  User.prototype.isVerifiedEmail = function () {
    return User.is_verified_email;
  };

  User.prototype.userID = function () {
    return User.id;
  };

  User.prototype.checkOTP = function (enterOTP) {
    return enterOTP === this.otp;
  };

  User.prototype.checkForgotOTP = function (enterOTP) {
    return enterOTP === this.otp_forgot;
  };

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  return User;
};
