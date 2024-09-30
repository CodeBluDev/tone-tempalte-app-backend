const base64url = require("base64url");
const crypto = require("crypto");
require("dotenv").config();

module.exports = (userId) => {
  const payload = {
    userId: userId,
    randomValue: crypto.randomBytes(16).toString("hex"),
  };
  const secretKey = "Kroger";
  return generateJWT(payload, secretKey);
};

function generateJWT(payload, secretKey) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = base64url(
    JSON.stringify(encodedHeader + "." + encodedPayload + "." + secretKey),
  );
  return encodedHeader + "." + encodedPayload + "." + signature;
}
