const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");

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
			required: [true, "Enter male or female"],
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
	{ versionKey: false, timestamps: false }
);

noticeSchema.post("save", schemaError);

const Notice = model("notice", noticeSchema);

module.exports = { Notice };
