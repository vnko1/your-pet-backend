const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");
const { date } = require("joi");

const noticeSchema = new Schema(
	{
		name: {
			type: String,
		},
		category: {
			type: String,
			default: "my-pet",
		},
		date: {
			type: Date,
		},
		type: {
			type: String,
		},
		file: {
			type: String,
		},
		comments: {
			type: String,
		},
		title: {
			type: String,
		},
		sex: {
			type: String,
		},
		location: {
			type: String,
		},
		price: {
			type: Number,
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
	{ versionKey: false, timestamps: false }
);

noticeSchema.post("save", schemaError);

const Notice = model("notice", noticeSchema);

module.exports = { Notice };
