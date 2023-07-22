const Joi = require("joi").extend(require("@joi/date"));

const addSchema = Joi.object({
	category: Joi.string()
		.valid("sell", "lost-found", "for-free", "my-pet")
		.required(),
	name: Joi.string()
		.min(2)
		.max(16)
		.messages({ "string": `Set nickname for pet` })
		.required(),
	date: Joi.date()
		.iso()
		.format("DD-MM-YYYY")
		.min("01-01-2000")
		.messages({ "date.format": `Date format is DD-MM-YYYY` })
		.required(),
	type: Joi.string()
		.min(2)
		.max(16)
		.messages({ "string.valid": `Enter the breed of pet` })
		.required(),
	sex: Joi.string()
		.valid("male", "female")
		.when("category", {
			is: Joi.valid("sell", "lost-found", "for-free"),
			then: Joi.required(),
		}),
	location: Joi.string()
		.min(2)
		.max(16)
		.when("category", {
			is: Joi.valid("sell", "lost-found", "for-free"),
			then: Joi.required(),
		}),
	price: Joi.number()
		.integer()
		.greater(0)
		.when("category", { is: "sell", then: Joi.required() }),
	comments: Joi.string().max(120).required(),
	favorite: Joi.boolean,
});

const updateFavorite = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = { addSchema, updateFavorite };
