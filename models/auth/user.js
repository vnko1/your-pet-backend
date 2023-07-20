const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");

const userSchema = new Schema({}, { versionKey: false, timestamps: true });

const User = model("user", userSchema);

module.exports = { User };
