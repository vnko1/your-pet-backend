const Joi = require("joi").extend(require("@joi/date"));

const addPetSchemaValidation = Joi.object({
  name: Joi.string().min(2).max(15).required().messages({
    "string.empty": `Name cannot be an empty field`,
    "any.required": `Name is a required field`,
  }),
  date: Joi.date()
    .format("DD-MM-YYYY")
    .utc()
    .min("01-01-2000")
    .max(new Date())
    .required()
    .messages({
      "any.required": `Date is a required field`,
      "date.format": `Date format is DD-MM-YYYY`,
      "date.max": "Your pet cannot be born in the future",
      "date.min": "Try to choose a later date",
    }),
  type: Joi.string().min(2).max(16).required().messages({
    "string.empty": `Type cannot be an empty field`,
    "any.required": `Type is a required field`,
  }),
  fileUrl: Joi.string(),
  fileId: Joi.string(),
  comments: Joi.alternatives().try(
    Joi.string().trim().valid("").empty("").default(""),
    Joi.string().max(120)
  ),
});

module.exports = { addPetSchemaValidation };
