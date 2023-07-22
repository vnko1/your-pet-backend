const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");
const { emailRegex, phoneRegex, cityRegex } = require("../../constants");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 15,
      required: [true, "Set name for user"],
    },
    birthday: {
      type: Date,
    },
    phone: { type: String, match: phoneRegex },
    city: { type: String, match: cityRegex, minlength: 2, maxlength: 30 },
    avatarUrl: { type: String },
  },
  { versionKey: false, timestamps: false }
);

userSchema.post("save", schemaError);

const User = model("user", userSchema);

module.exports = { User };
