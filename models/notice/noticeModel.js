const { Schema, model } = require("mongoose");

const { schemaError } = require("../../utils");

const noticeSchema = new Schema({}, { versionKey: false, timestamps: true });

const Notice = model("notice", noticeSchema);

module.exports = { Notice };
