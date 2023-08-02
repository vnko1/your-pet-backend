const jwt = require("jsonwebtoken");

const createToken = (payloadData, secretKey, date = 2) => {
  const key = Object.keys(payloadData);

  const expirationValue = Number.parseInt(date);

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + expirationValue);

  const tokenLifeTime = (futureDate - new Date()) / 1000;

  const token = jwt.sign({ [key]: payloadData[key] }, secretKey, {
    expiresIn: tokenLifeTime,
  });

  const convertedTime = new Date();
  convertedTime.setSeconds(convertedTime.getSeconds() + tokenLifeTime);

  return [token, convertedTime];
};

module.exports = { createToken };
