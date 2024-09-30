const db = require("../models");
const dateFormat = require("../utils/dateFormat");
const monthDateFormat = require("../utils/monthDateFormat");
const keyDateFormat = require("../utils/keyDateFormat");
const Event = db.events;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;

//upload event
exports.upload_event = async (req, res) => {
  try {
    let {
      title,
      short_description,
      full_description,
      stage,
      date,
      time,
      cant_miss_event,
    } = req.body;
    const date_formatted = dateFormat(date);
    const month_formatted = monthDateFormat(date);
    const uploadEvent = {
      title: title,
      short_description: short_description,
      full_description: full_description,
      stage: stage,
      date: date,
      time: time,
      cant_miss_event: cant_miss_event,
      date_formatted: date_formatted,
      month_formatted: month_formatted,
      time_formatted: time,
    };
    Event.create(uploadEvent)
      .then((data) => {
        res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Event post upload successfully",
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

//get event
exports.get_events = async (req, res) => {
  try {
    const events = await Event.findAll();
    const separatedEvents = {};
    events.forEach((event) => {
      const date = event.date;
      const keyDateFormat1 = keyDateFormat(date);
      if (!separatedEvents[keyDateFormat1]) {
        separatedEvents[keyDateFormat1] = [];
      }
      separatedEvents[keyDateFormat1].push(event);
    });
    res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Event retrieved successfully",
      events: separatedEvents,
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
