const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");
const { date } = require("joi");

const noticeSchema = new Schema(
	{
		name: {
			type: String,
			minlength: 2,
			maxlength: 15,
			required: [true, "Set name for pet"],
		},
		category: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: [true, "Set birthday date for pet"],
		},
		type: {
			type: String,
		},
		fileUrl: { type: String, required: true },
		fileId: { type: String, required: true },
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
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false, timestamps: false }
);

noticeSchema.post("save", schemaError);

const Notice = model("notice", noticeSchema);

module.exports = { Notice };
