const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const createToken = (payloadData, secretKey, tokenExpirationValue = "2d") => {
  const key = Object.keys(payloadData);

  const token = jwt.sign({ [key]: payloadData[key] }, secretKey, {
    expiresIn: tokenExpirationValue,
  });
  const { exp } = jwt_decode(token);

  const tokenLifeTime = new Date(exp * 1000);

  return [token, tokenLifeTime];
};

module.exports = { createToken };
