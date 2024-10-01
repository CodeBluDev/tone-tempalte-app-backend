const db = require("../models");
const User = db.users;

const logger = (req, res, next) => {
  console.log(`Received: ${req.method} ${req.path} Body: ${JSON.stringify(req.body)}`);
  next();
};

const authenticateJWT = async (req, res, next) => {
  // Marking as async
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const user = await findUserByAuthToken(token);
      if (user == null || !(user instanceof User)) {
        res.status(403).send({
          status: false,
          statusCode: 403,
          message: "Invalid Authorization Token.",
        });
      } else {
        res.user = user;
        next();
      }
    } catch (error) {
      res.status(500).send({
        status: false,
        statusCode: 500,
        message: "Internal Server Error.",
      });
    }
  } else {
    res.status(401).send({
      status: false,
      statusCode: 401,
      message: "You must provide Authorization header",
    });
  }
};

async function findUserByAuthToken(token) {
  try {
    const users = await User.findAll({ where: { token: token } });
    return users instanceof Array ? users[0] : null;
  } catch (ex) {
    throw ex;
  }
}

module.exports = {
  logger: logger,
  auth: authenticateJWT,
};
