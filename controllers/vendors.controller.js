const db = require("../models");
const Vendors = db.vendors;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;

//get vendors
exports.get_vendors = async (req, res) => {
  try {
    const vendors = await Vendors.findAll();
    res
      .status(200)
      .send({
        status: true,
        statusCode: 200,
        message: "Vendors retrieved successfully",
        vendors: vendors,
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        statusCode: 500,
        message: err.message || "Internal Server Error!",
      });
  }
};

//upload vendors
exports.upload_vendors = async (req, res) => {
  try {
    let { title, location } = req.body;
    const uploadVendors = {
      title: title,
      location: location,
    };
    Vendors.create(uploadVendors)
      .then((data) => {
        res
          .status(200)
          .send({
            status: true,
            statusCode: 200,
            message: "Vendors upload successfully",
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
    res
      .status(500)
      .send({
        status: false,
        statusCode: 500,
        message: err.message || "Internal Server Error!",
      });
  }
};

module.exports = exports;