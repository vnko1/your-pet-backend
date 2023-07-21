const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");

const Joi = require("joi");

const noticeSchema = new Schema(
	{
		nickname: {
			type: String,
			required: [true, "Set nickname for pet"],
		},
		category: {
			type: String,
      required: true,
		},
		birthday: {
			type: String,
      required: [true, "Enter a date of birth"],
		},
		breed: {
			type: String,
      required: [true, "Enter the breed of pet"],
		},
    avatarURL: {
      type: String,
      require: true,
    },
		comments: {
			type: String,
      required: [true, "Enter your comment"],
		},
		title: {
			type: String,
      required: true,
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
			type: String,
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
  nickname: Joi.string().min(2).max(12).required(),
  breed: Joi.string().min(2).max(12).required(),
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
