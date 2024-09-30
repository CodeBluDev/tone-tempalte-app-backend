const db = require("../models");
const Notification = db.notifications;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;

//get notification
exports.get_notification = async (req, res) => {
  try {
    const notification = await Notification.findAll();
    res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Notification retrieved successfully",
      notifications: notification,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: err.message || "Internal Server Error!",
    });
  }
};

//upload notification
exports.upload_notification = async (req, res) => {
  try {
    let { title, notification, dateTime } = req.body;
    const uploadNotification = {
      title: title,
      notification: notification,
      date_time: dateTime,
    };
    Notification.create(uploadNotification)
      .then((data) => {
        res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Notification updated successfully",
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: false,
          statusCode: 500,
          message: err.message || "Internal Server Error!",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: err.message || "Internal Server Error!",
    });
  }
};

module.exports = exports;
