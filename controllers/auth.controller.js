const db = require("../models");
require("dotenv").config();
const jwtGenerator = require("../utils/jwtGenerator");
const sendMail = require("../utils/sendMail");
const User = db.users;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;

// async function findUserByEmail(email) {
//   try {
//     users = await User.findAll({ where: { email: email } });
//     return users instanceof Array ? users[0] : null;
//   } catch (ex) {
//     throw ex;
//   }
// }
async function findUserByEmail(email) {
  try {
        const lowercasedEmail = email.toLowerCase(); // Convert email to lowercase
    const user = await User.findOne({ where: { email: lowercasedEmail } });

    return user;  // This will return the user instance or null
  } catch (ex) {
    throw ex;  // Catch any errors during the query
  }
}
// async function findUserByEmail(email) {
//   try {
//     const user = await User.findOne({ where: { email } });

//     // If user is found, force conversion to an instance of User
//     if (user) {
//       return User.build(user.dataValues, { isNewRecord: false });
//     }

//     return null;  // Return null if no user is found
//   } catch (ex) {
//     throw ex;
//   }
// }


//signup
exports.user_register = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    const user = await findUserByEmail(req.body.email);
    if (user != null || user instanceof User) {
      res.status(201).send({
        status: false,
        statusCode: 201,
        message: "This email address is already used.",
      });
    } else {
      let otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const newUser = {
        firstname: firstName,
        lastname: lastName,
        name: firstName + " " + lastName,
        email: email,
        password: password,
        otp: otp,
      };

      User.create(newUser)
        .then((data) => {
          const subject = "OTP for Email Verification";
          const html =
            "<p>Hi " +
            email +
            ",<br/><br/>We have received your request for a single-use code to use with your Kroger.<br/><br/>Your single-use code is: <strong>" +
            otp +
            "</strong>.<br/><br>If you did not request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.<br/><br/>Thanks,<br/>The Kroger Team</p>";
          sendMail(email, subject, html);
          res.send({
            status: true,
            statusCode: 200,
            message:
              "Your account has been created successfully. Please check your inbox for OTP verification.",
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: false,
            statusCode: 500,
            message: err.message || "Internal Server Error!",
          });
        });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: err.message || "Internal Server Error!",
    });
  }
};

//login
exports.user_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(req.body.email);

    if (user == null || !(user instanceof User)) {
      res.status(201).send({
        status: false,
        statusCode: 201,
        message: "This email address doesn't exist.",
      });
    } else {
      if (user.verifyPassword(req.body.password)) {
        if (user.isVerifiedEmail()) {
          const token = jwtGenerator(user.userID());
          user
            .update(
              { token: token },
              {
                where: { id: user.userID() },
              },
            )
            .then((result) => {
              const data = {
                _id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                firstName: user.firstname,
                lastName: user.lastname,
                token: user.token,
                phone: user.phone,
              };
              res.status(200).send({
                status: true,
                statusCode: 200,
                message: "Login successfully.",
                data: data,
              });
              console.log("Update successful:", user.data);
            })
            .catch((error) => {
              res.status(500).send({
                status: false,
                statusCode: 500,
                message: error.message || "Internal Server Error!",
              });
            });
        } else {
          res.status(202).send({
            status: false,
            statusCode: 202,
            message: "Your email address could not be verified.",
            isVerified: user.isVerifiedEmail(),
          });
        }
      } else {
        res.status(201).send({
          status: false,
          statusCode: 201,
          message: "Your email and password don't match.",
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: err.message || "Internal Server Error!",
    });
  }
};

//EMail verifitcaiotn
exports.email_verification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: "This email address doesn't exist.",
      });
    }

    // Check the user object and its prototype methods
    console.log("User object: ", user);
    console.log("Available methods: ", Object.getOwnPropertyNames(Object.getPrototypeOf(user)));

    // Add log to verify that the OTP check is actually invoked
    console.log("OTP received: ", otp);
    console.log("User's OTP: ", user.otp);

    if (user.verifyOTP(otp)) {
      // Generate token and proceed if OTP is verified
      const token = jwtGenerator(user.userID());
      user.token = token;
      await user.save();

      const data = {
        _id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        firstName: user.firstname,
        lastName: user.lastname,
        token: user.token,
        phone: user.phone,
      };

      res.status(200).send({
        status: true,
        statusCode: 200,
        message: "OTP verified successfully.",
        data: data,
      });
    } else {
      res.status(400).send({
        status: false,
        statusCode: 400,
        message: "Invalid OTP.",
      });
    }
  } catch (error) {
    console.error("Error in try-catch: ", error);
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

//forgot otp
exports.sent_otp_forgot = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await findUserByEmail(req.body.email);

    if (user == null || !(user instanceof User)) {
      res.status(201).send({
        status: false,
        statusCode: 201,
        message: "This email address doesn't exist.",
      });
    } else {
      let otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      user
        .update(
          { otp_forgot: otp },
          {
            where: { id: user.userID() },
          },
        )
        .then((result) => {
          const subject = "OTP for Forgot Password";
          const html =
            "<p>Hi " +
            email +
            ",<br/><br/>We have received your request for a single-use code to use with your Kroger.<br/><br/>Your single-use code is: <strong>" +
            otp +
            "</strong>.<br/><br>If you did not request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.<br/><br/>Thanks,<br/>The Kroger Team</p>";
          sendMail(email, subject, html);
          res.status(200).send({
            status: true,
            statusCode: 200,
            message:
              "OTP sent successfully. Please check your email for OTP verification.",
          });
        })
        .catch((error) => {
          res.status(500).send({
            status: false,
            statusCode: 500,
            message: error.message || "Internal Server Error!",
          });
        });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: err.message || "Internal Server Error!",
    });
  }
};

//forgot password
exports.forgot_password = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await findUserByEmail(req.body.email);

    if (user == null || !(user instanceof User)) {
      res.status(201).send({
        status: false,
        statusCode: 201,
        message: "This email address doesn't exist.",
      });
    } else {
      if (user.checkForgotOTP(otp)) {
        user
          .update(
            { password: password },
            {
              where: { id: user.userID() },
            },
          )
          .then((result) => {
            res.status(200).send({
              status: true,
              statusCode: 200,
              message: "Your password has been updated successfully.",
            });
          })
          .catch((error) => {
            res.status(500).send({
              status: false,
              statusCode: 500,
              message: error.message || "Internal Server Error!",
            });
          });
      } else {
        res.status(201).send({
          status: true,
          statusCode: 201,
          message: "OTP code is invalid!",
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: err.message || "Internal Server Error!",
    });
  }
};

//change password
exports.change_password = async (req, res) => {
  try {
    const { old_password, password } = req.body;
    const user = res.user;

    if (user == null || !(user instanceof User)) {
      res.status(201).send({
        status: false,
        statusCode: 201,
        message: "Invalid User!",
      });
    } else {
      if (user.verifyPassword(old_password)) {
        user
          .update(
            { password: password },
            {
              where: { id: user.userID() },
            },
          )
          .then((result) => {
            res.status(200).send({
              status: true,
              statusCode: 200,
              message: "Your password has been changed successfully.",
            });
          })
          .catch((error) => {
            res.status(500).send({
              status: false,
              statusCode: 500,
              message: error.message || "Internal Server Error!",
            });
          });
      } else {
        res.status(201).send({
          status: true,
          statusCode: 201,
          message: "Current password doesn't match.",
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: err.message || "Internal Server Error!",
    });
  }
};

module.exports = exports;
