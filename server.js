const express = require("express");
const cors = require("cors");
const db = require("./models");
const { logger } = require("./middlewares/auth");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
db.connection.sync();

require("./routes/routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  
});

