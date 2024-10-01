module.exports = (app) => {
  const authentication = require("../controllers/auth.controller.js");
  const home = require("../controllers/home.controller.js");
  const homeBottom = require("../controllers/homebottom.controller.js");
  const profile = require("../controllers/profile.controller.js");
  const event = require("../controllers/event.controller.js");
  const sponsors = require("../controllers/sponsors.controller.js");
  const notification = require("../controllers/notification.controller.js");
  const vendors = require("../controllers/vendors.controller.js");
  const { _, auth } = require("../middlewares/auth");
  const validateInfo = require("../middlewares/validateInfo");

  var router = require("express").Router();

  router.post("/signup", validateInfo, authentication.user_register);
  router.post("/login", validateInfo, authentication.user_login);
  router.post("/verifyOTP", validateInfo, authentication.email_verification);
  router.post("/sentForgotOTP", validateInfo, authentication.sent_otp_forgot);
  router.post("/forgotPassword", validateInfo, authentication.forgot_password);
  router.post("/changePassword", validateInfo, auth, authentication.change_password);
  router.get("/getSlider", home.get_slider_home);
  router.post("/uploadSlider", validateInfo, home.upload_slider_home);
  router.post("/uploadHomeBottomImage", validateInfo, homeBottom.upload_home_bottom_image);
  router.get("/getHomeBottomImage", homeBottom.get_bottom_image);
  router.post("/updateProfile", validateInfo, auth, profile.update_profile);
  router.get("/getProfile", auth, profile.get_profile);
  router.post("/uploadEvent", event.upload_event);
  router.get("/getEvents", event.get_events);
  router.post("/uploadSponsors", sponsors.upload_sponsors);
  router.get("/getSponsors", sponsors.get_sponsors);
  router.post("/uploadNotification", notification.upload_notification);
  router.get("/getNotification", notification.get_notification);
  router.post("/uploadVendor", vendors.upload_vendors);
  router.get("/getVendors", vendors.get_vendors);

  router.post("/adminLogin", authentication.user_login);

  app.use("/api", router);
};