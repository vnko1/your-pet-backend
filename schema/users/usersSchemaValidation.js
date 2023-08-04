const Joi = require("joi").extend(require("@joi/date"));

const {
  emailRegex,
  passwordRegex,
  phoneRegex,
  cityRegex,
} = require("../../constants");

const registerSchemaValidation = Joi.object({
  name: Joi.string().min(2).max(15).required().messages({
    "string.empty": `Name cannot be an empty field`,
    "any.required": `Name is a required field`,
    "string.min": `Name is not valid`,
    "string.max": `Name is not valid`,
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base": `Email is not valid`,
    "string.empty": `Email cannot be an empty field`,
    "any.required": `Email is a required field`,
  }),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegex)
    .required()
    .messages({
      "string.pattern.base": `Password is not valid`,
      "string.min": `Password is not valid`,
      "string.max": `Password is not valid`,
      "string.empty": `Password cannot be an empty field`,
      "any.required": `Password is a required field`,
    }),
});

const loginSchemaValidation = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base": `Email is not valid`,
    "string.empty": `Email cannot be an empty field`,
    "any.required": `Email is a required field`,
  }),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegex)
    .required()
    .messages({
      "string.pattern.base": `Password is not valid`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": `Password is not valid`,
      "string.max": `Password is not valid`,
      "any.required": `Password is a required field`,
    }),
});

const editUserValidation = Joi.object({
  name: Joi.string().min(2).max(15).messages({
    "string.empty": `Name cannot be an empty field`,
    "string.min": `Name is not valid`,
    "string.max": `Name is not valid`,
  }),
  email: Joi.string().pattern(emailRegex).messages({
    "string.pattern.base": `Email is not valid`,
  }),
  city: Joi.alternatives().try(
    Joi.string().trim().valid("").empty("").default(""),
    Joi.string().pattern(cityRegex).min(2).max(30).messages({
      "string.pattern.base": `City is not valid`,
      "string.min": `City is not valid`,
      "string.max": `City is not valid`,
    })
  ),
  phone: Joi.alternatives().try(
    Joi.string().trim().valid("").empty("").default(""),
    Joi.string().pattern(phoneRegex).min(13).messages({
      "string.pattern.base": `Phone is not valid`,
      "string.min": `Phone is not valid`,
    })
  ),

  birthday: Joi.alternatives().try(
    Joi.date().valid("").empty("").default(null),
    Joi.date()
      .format("DD-MM-YYYY")
      .utc()
      .min("01-01-1940")
      .max(new Date())
      .messages({
        "date.format": `Date format is DD-MM-YYYY`,
        "date.max": "You cannot be born in the future",
        "date.min": "Try to choose a later date",
      })
  ),
  avtarUrl: Joi.string(),
  avatarId: Joi.string(),
  avatar: Joi.any(),
});
//
module.exports = {
  registerSchemaValidation,
  loginSchemaValidation,
  editUserValidation,
};
