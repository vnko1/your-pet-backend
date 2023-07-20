const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
    birthday: {
      type: String,
    },
    phone: { type: String },
    city: { type: String },
    avatarUrl: { type: String },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", schemaError);

const User = model("user", userSchema);

module.exports = { User };
