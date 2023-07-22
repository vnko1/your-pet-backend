const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");

const petSchema = new Schema(
  {
    category: { type: String, required: true, default: "my-pet" },
    name: {
      type: String,
      minlength: 2,
      maxlength: 15,
      required: [true, "Set name for pet"],
    },
    date: {
      type: Date,
      required: [true, "Set birthday date for pet"],
    },
    type: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: true,
    },
    fileUrl: { type: String, required: true },
    comments: { type: String, maxlength: 120 },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: false }
);

petSchema.post("save", schemaError);

const Pet = model("user", petSchema);

module.exports = { Pet };
