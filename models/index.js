const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.connection = sequelize;

// Rename profile to avoid overwriting users
db.users = require("./user.model.js")(db.connection, db.Sequelize);
db.profiles = require("./profile.model.js")(db.connection, db.Sequelize); // Renamed to profiles
db.homes = require("./home.model.js")(db.connection, db.Sequelize);
db.homebottoms = require("./homebottom.model.js")(db.connection, db.Sequelize);
db.events = require("./event.model.js")(db.connection, db.Sequelize);
db.sponsors = require("./sponsors.model.js")(db.connection, db.Sequelize);
db.notifications = require("./notification.model.js")(db.connection, db.Sequelize);
db.vendors = require("./vendor.model.js")(db.connection, db.Sequelize);

module.exports = db;
