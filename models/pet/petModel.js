const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");

const petSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 15,
      required: [true, "Set name for pet"],
    },
    date: {
      type: Date,
      required: [true, "Set birthday date for pet"],
      min: "2000-01-01",
      max: new Date(),
    },
    type: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: true,
    },
    fileUrl: { type: String, required: true },
    fileId: { type: String, required: true },
    comments: { type: String, maxlength: 120, default: "" },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: false }
);

petSchema.post("save", schemaError);

const Pet = model("pet", petSchema);

module.exports = { Pet };
