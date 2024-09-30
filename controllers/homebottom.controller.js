const db = require("../models");
const HomeBottom = db.homebottoms;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;

//get home screen bottom image
exports.get_bottom_image = async (req, res) => {
  try {
    const data = await HomeBottom.findAll();
    res
      .status(200)
      .send({
        status: true,
        statusCode: 200,
        message: "Bottom post retrieved successfully",
        data: data[0],
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

//upload slider
exports.upload_home_bottom_image = async (req, res) => {
  try {
    let { imageUrl } = req.body;
    const uploadBottomImage = {
      image_url: imageUrl,
    };
    HomeBottom.create(uploadBottomImage)
      .then((data) => {
        res
          .status(200)
          .send({
            status: true,
            statusCode: 200,
            message: "Bottom post upload successfully",
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