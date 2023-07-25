const Joi = require("joi").extend(require("@joi/date"));

const addSchema = Joi.object({
	category: Joi.string().valid("sell", "lost-found", "for-free").required(),
	name: Joi.string()
		.min(2)
		.max(16)
		.messages({ string: `Set nickname for pet` })
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
		.max(16)
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
	comments: Joi.string().max(120).required(),
	favorite: Joi.boolean,
});

module.exports = { addSchema };
