const db = require("../models");
const Home = db.homes;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;

//get slider
exports.get_slider_home = async (req, res) => {
  try {
    const slider = await Home.findAll();
    res
      .status(200)
      .send({
        status: true,
        statusCode: 200,
        message: "Slider post retrieved successfully",
        slides: slider,
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
exports.upload_slider_home = async (req, res) => {
  try {
    let { sliderUrl, sliderType } = req.body;
    const uploadSlider = {
      post_url: sliderUrl,
      post_type: sliderType,
    };
    Home.create(uploadSlider)
      .then((data) => {
        res
          .status(200)
          .send({
            status: true,
            statusCode: 200,
            message: "Slider post upload successfully",
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