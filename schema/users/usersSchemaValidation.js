const Joi = require("joi");

const { emailRegex, passwordRegex } = require("../../constants");

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
});

module.exports = {
  registerSchemaValidation,
  loginSchemaValidation,
  editUserValidation,
};
