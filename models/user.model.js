const crypto = require("crypto");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      set(val) {
        this.setDataValue("email", val.toLowerCase());
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue("password");
      },
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: true,
      get() {
        return () => this.getDataValue("salt");
      },
    },
    otp: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    token: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    otp_forgot: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    notification_status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    is_verified_email: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    date_of_birth: {
      type: Sequelize.DATEONLY,
      allowNull: true, // Optional for now
    },
    rewards_member: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    rewards_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    points: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  });

  
  User.generateSalt = function () {
    return crypto.randomBytes(16).toString("base64");  // Generates a 16-byte salt
  };
  
  User.encryptPassword = function (plainText, salt) {
    return crypto.createHash("RSA-SHA256")
      .update(plainText)
      .update(salt)
      .digest("hex");  // Encrypts password with the provided salt
  };
  
  function setSaltAndPassword(user) {
    console.log('Setting salt and password for user:', user);  // Debug
    if (user.changed('password')) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  }
  
  User.prototype.verifyOTP = function (enteredOTP) {
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