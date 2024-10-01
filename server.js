const express = require("express");
const cors = require("cors");
const db = require("./models");  // Ensure this points to your models/index.js
const { logger } = require("./middlewares/auth");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Update this to use the sequelize instance instead of connection
db.sequelize.sync({ force: true }) // This will drop and recreate the tables
  .then(() => {
    console.log("Database reset and synchronized");
  })
  .catch(err => {
    console.error("Error syncing the database:", err);
  });

require("./routes/routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
