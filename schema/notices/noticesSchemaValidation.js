const Joi = require("joi").extend(require("@joi/date"));

const addSchema = Joi.object({
  category: Joi.string().valid("sell", "lost-found", "for-free").required(),
  name: Joi.string()
    .min(2)
    .max(16)
    .messages({ string: `Set name for pet` })
    .required(),
  date: Joi.date()
    .iso()
    .format("DD-MM-YYYY")
    .min("01-01-2000")
    .max(new Date())
    .messages({
      "date.format": `Date format is DD-MM-YYYY`,
      "date.max": "Your pet cannot be born in the future",
      "date.min": "Try to choose a later date",
    })
    .required(),
  type: Joi.string()
    .min(2)
    .max(16)
    .messages({ "string.valid": `Enter the breed of pet` })
    .required(),
  fileUrl: Joi.string(),
  fileId: Joi.string(),
  sex: Joi.string()
    .valid("male", "female")
    .when("category", {
      is: Joi.valid("sell", "lost-found", "for-free"),
      then: Joi.required(),
    }),
  location: Joi.string()
    .min(2)
    .when("category", {
      is: Joi.valid("sell", "lost-found", "for-free"),
      then: Joi.required(),
    }),
  title: Joi.string()
    .min(3)
    .max(30)
    .when("category", {
      is: Joi.valid("sell", "lost-found", "for-free"),
      then: Joi.required(),
    }),
  price: Joi.number()
    .integer()
    .greater(0)
    .when("category", { is: "sell", then: Joi.required() }),
  comments: Joi.alternatives().try(
    Joi.string().trim().valid("").empty("").default(""),
    Joi.string().max(120)
  ),
});

module.exports = { addSchema };
