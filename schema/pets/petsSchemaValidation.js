const Joi = require("joi").extend(require("@joi/date"));

const addPetSchemaValidation = Joi.object({
  name: Joi.string().min(2).max(15).required(),
  date: Joi.date().format("DD-MM-YYYY").utc().min("01-01-2000").required(),
  type: Joi.string().min(2).max(16).required(),
  fileUrl: Joi.string(),
  fileId: Joi.string(),
  comments: Joi.string().max(120),
});

module.exports = { addPetSchemaValidation };
