const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");
const {
  emailRegex,
  phoneRegex,
  cityRegex,
  defaultAvatarUrl,
} = require("../../constants");

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
      select: false,
    },

    name: {
      type: String,
      minlength: 2,
      maxlength: 15,
      required: [true, "Set name for user"],
    },
    pets: [{ type: Schema.Types.ObjectId, ref: "pet" }],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "notice",
      },
    ],
    birthday: {
      type: Date,
    },
    phone: { type: String, match: phoneRegex },
    city: { type: String, match: cityRegex, minlength: 2, maxlength: 30 },
    avatarUrl: { type: String, default: defaultAvatarUrl },
    avatarId: { type: String, default: "" },
    token: {
      type: String,
      default: "",
    },
    refreshToken: { type: String, default: "" },
  },
  { versionKey: false, timestamps: false }
);

userSchema.post("save", schemaError);

const User = model("user", userSchema);

module.exports = { User };
