const Joi = require("joi").extend(require("@joi/date"));

const addSchema = Joi.object({
	category: Joi.string()
		.valid("sell", "lost-found", "for-free", "my-pet")
		.required(),
	name: Joi.string().min(2).max(16).required(),
	date: Joi.date()
		.format("DD-MM-YYYY")
		.min("01-01-2000")
		.messages({ "date.format": `Date format is DD-MM-YYYY` })
		.required(),
	type: Joi.string().min(2).max(16).required(),
	sex: Joi.string().valid("male", "female").required(),
  location: Joi.string().min(2).max(16).required(),
	price: Joi.number().integer().greater(0).required(),
	comments: Joi.string().max(120).required(),
	favorite: Joi.boolean,
});

const updateFavorite = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = { addSchema, updateFavorite };