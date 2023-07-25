const jwt = require("jsonwebtoken");

const createToken = (payloadData, secretKey, tokenLife) => {
  const key = Object.keys(payloadData);

  return jwt.sign({ [key]: payloadData[key] }, secretKey, {
    expiresIn: tokenLife,
  });
};

module.exports = { createToken };
