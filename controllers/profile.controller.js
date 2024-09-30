const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;

//update profile name and password
exports.update_profile = async (req, res) => {
  try {
    const { username, phone } = req.body;
    const user = res.user;

    if (user == null || !(user instanceof User)) {
      res.status(201).send({
        status: false,
        statusCode: 201,
        message: "Invalid User!",
      });
    } else {
      user
        .update(
          { name: username, phone: phone },
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
            message: "Your profile has been updated successfully.",
            data: data,
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

//get profile
exports.get_profile = async (req, res) => {
  try {
    const user = res.user;

    if (user == null || !(user instanceof User)) {
      res.status(201).send({
        status: false,
        statusCode: 201,
        message: "Invalid User!",
      });
    } else {
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
        message: "Profile retrieved successfully.",
        data: data,
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

module.exports = exports;