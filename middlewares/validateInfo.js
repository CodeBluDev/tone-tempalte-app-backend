const isValidEmail = require("../utils/emailValidation");
const isValidPassword = require("../utils/passwordValidation");
const {
  ERR_FIRST_NAME,
  ERR_LAST_NAME,
  ERR_EMAIL,
  ERR_INVALID_EMAIL,
  ERR_PASSWORD,
  ERR_INVALID_PASSWORD,
  ERR_OTP,
  ERR_AUTH_HEADER,
  ERR_OLD_PASSWORD,
  ERR_POST_URL,
  ERR_POST_TYPE,
  ERR_NAME,
  ERR_PHONE,
  ERR_IMAGE_URL,
} = require("../utils/constants");

module.exports = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    otp,
    old_password,
    sliderUrl,
    sliderType,
    username,
    phone,
    imageUrl,
  } = req.body;
  const auth = req.header("Authorization");
  let errorMessage;
  let isEmpty;

  switch (req.path) {
    case "/signup":
      switch (true) {
        case !firstName:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_FIRST_NAME,
          };
          break;
        case !lastName:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_LAST_NAME,
          };
          break;
        case !email:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_EMAIL,
          };
          break;
        case !isValidEmail(email):
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_INVALID_EMAIL,
          };
          break;
        case !password:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_PASSWORD,
          };
          break;
        case !isValidPassword(password):
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_INVALID_PASSWORD,
          };
          break;
        default:
          break;
      }
      if (errorMessage != "undefined" && errorMessage != null) {
        isEmpty = Object.keys(errorMessage).length === 0;
        if (!isEmpty) {
          return res.status(400).send(errorMessage);
        }
      }
      break;

    case "/login":
      switch (true) {
        case !email:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_EMAIL,
          };
          break;
        case !password:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_PASSWORD,
          };
          break;
        default:
          break;
      }
      if (errorMessage != "undefined" && errorMessage != null) {
        isEmpty = Object.keys(errorMessage).length === 0;
        if (!isEmpty) {
          return res.status(400).send(errorMessage);
        }
      }
      break;

    case "/verifyOTP":
      switch (true) {
        case !email:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_EMAIL,
          };
          break;
        case !otp:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_OTP,
          };
          break;
        default:
          break;
      }
      if (errorMessage != "undefined" && errorMessage != null) {
        isEmpty = Object.keys(errorMessage).length === 0;
        if (!isEmpty) {
          return res.status(400).send(errorMessage);
        }
      }
      break;

    case "/sentForgotOTP":
      switch (true) {
        case !email:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_EMAIL,
          };
          break;
        default:
          break;
      }
      if (errorMessage != "undefined" && errorMessage != null) {
        isEmpty = Object.keys(errorMessage).length === 0;
        if (!isEmpty) {
          return res.status(400).send(errorMessage);
        }
      }
      break;

    case "/forgotPassword":
      switch (true) {
        case !otp:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_OTP,
          };
          break;
        case !email:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_EMAIL,
          };
          break;
        case !password:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_PASSWORD,
          };
          break;
        case !isValidPassword(password):
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_INVALID_PASSWORD,
          };
          break;
        default:
          break;
      }
      if (errorMessage != "undefined" && errorMessage != null) {
        isEmpty = Object.keys(errorMessage).length === 0;
        if (!isEmpty) {
          return res.status(400).send(errorMessage);
        }
      }
      break;

    case "/changePassword":
      switch (true) {
        case !old_password:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_OLD_PASSWORD,
          };
          break;
        case !password:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_PASSWORD,
          };
          break;
        case !isValidPassword(password):
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_INVALID_PASSWORD,
          };
          break;
        default:
          break;
      }
      if (errorMessage != "undefined" && errorMessage != null) {
        isEmpty = Object.keys(errorMessage).length === 0;
        if (!isEmpty) {
          return res.status(400).send(errorMessage);
        }
      }
      break;

    case "/uploadSlider":
      switch (true) {
        case !sliderUrl:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_POST_URL,
          };
          break;
        case !sliderType:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_POST_TYPE,
          };
          break;
        default:
          break;
      }
      if (errorMessage != "undefined" && errorMessage != null) {
        isEmpty = Object.keys(errorMessage).length === 0;
        if (!isEmpty) {
          return res.status(400).send(errorMessage);
        }
      }
      break;

    case "/updateProfile":
      switch (true) {
        case !username:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_NAME,
          };
          break;
        case !phone:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_PHONE,
          };
          break;
        default:
          break;
      }
      if (errorMessage != "undefined" && errorMessage != null) {
        isEmpty = Object.keys(errorMessage).length === 0;
        if (!isEmpty) {
          return res.status(400).send(errorMessage);
        }
      }
      break;

    case "/uploadHomeBottomImage":
      switch (true) {
        case !imageUrl:
          errorMessage = {
            status: false,
            statusCode: 400,
            message: ERR_IMAGE_URL,
          };
          break;
        default:
          break;
      }
      if (errorMessage != "undefined" && errorMessage != null) {
        isEmpty = Object.keys(errorMessage).length === 0;
        if (!isEmpty) {
          return res.status(400).send(errorMessage);
        }
      }
      break;

    default:
      break;
  }

  next();
};
