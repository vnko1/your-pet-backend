const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");

const Joi = require("joi").extend(require("@joi/date"));

const noticeSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set nickname for pet"],
		},
		category: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: [true, "Enter a date of birth"],
		},
		type: {
			type: String,
			required: [true, "Enter the breed of pet"],
		},
		file: {
			type: String,
			require: true,
		},
		comments: {
			type: String,
		},
		title: {
			type: String,
		},
		sex: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		// owner: {
		// 	type: Schema.Types.ObjectId,
		// 	ref: "user",
		// 	required: true,
		// },
	},
	{ versionKey: false, timestamps: true }
);

noticeSchema.post("save", schemaError);

const addSchema = Joi.object({
	category: Joi.string()
		.valid("sell", "lost-found", "for-free", "my-pet")
		.required(),
	name: Joi.string().min(2).max(16).uppercase().required(),
	date: Joi.date()
		.format(['DD-MM-YYYY'])
		.min("01-01-2000")
		.messages({ "date.format": `Date format is DD-MM-YYYY` })
		.required(),
	type: Joi.string().min(2).max(16).uppercase().required(),
	price: Joi.number().integer().greater(0).required(),
	favorite: Joi.boolean,
});

const updateFavorite = Joi.object({
	favorite: Joi.boolean().required(),
});

const noticeSchemas = {
	addSchema,
	updateFavorite,
};

const Notice = model("notice", noticeSchema);

module.exports = { Notice, noticeSchemas };
