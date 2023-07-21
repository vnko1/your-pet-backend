const Joi = require("joi").extend(require("@joi/date"));

const { emailRegex, passwordRegex, phoneRegex } = require("../../constants");

const registerSchemaValidation = Joi.object({
  name: Joi.string().min(2).max(15).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(16).pattern(passwordRegex).required(),
});

const loginSchemaValidation = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(16).pattern(passwordRegex).required(),
});

const editUserValidation = Joi.object({
  name: Joi.string().min(2).max(15),
  email: Joi.string().pattern(emailRegex),
  city: Joi.string(),
  phone: Joi.string().pattern(phoneRegex).min(13),
  birthday: Joi.date().format("DD-MM-YYYY").min("01-01-1940"),
});

module.exports = {
  registerSchemaValidation,
  loginSchemaValidation,
  editUserValidation,
};
