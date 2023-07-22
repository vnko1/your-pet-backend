const jwt = require("jsonwebtoken");

const { expiresIn } = require("../constants");

const createToken = (payloadData) => {
  const key = Object.keys(payloadData);

  const token = jwt.sign({ [key]: payloadData[key] }, process.env.JWT_KEY, {
    expiresIn: expiresIn,
  });
  return token;
};

module.exports = { createToken };
