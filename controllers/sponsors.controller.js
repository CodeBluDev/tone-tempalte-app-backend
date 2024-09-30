const db = require("../models");
const Sponsors = db.sponsors;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;

//upload sponsors
exports.upload_sponsors = async (req, res) => {
  try {
    let { name, url, image, type } = req.body;
    const uploadSponsors = {
      name: name,
      url: url,
      image: image,
      type: type,
    };
    Sponsors.create(uploadSponsors)
      .then((data) => {
        res.status(200).send({
          status: true,
          statusCode: 200,
          message: "Sponsors upload successfully",
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

//get sponsors
exports.get_sponsors = async (req, res) => {
  try {
    const sponsors = await Sponsors.findAll();
    res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Sponsors retrieved successfully",
      sponsors: sponsors,
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
