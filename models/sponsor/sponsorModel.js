const { Schema, model } = require("mongoose");

const sponsorSchema = new Schema(
  {
    title: String,
    url: String,
    addressUrl: String,
    imageUrl: String,
    addres: String,
    phone: String,
    email: String,
    workDays: [{ isOpen: Boolean, from: String, to: String }],
  },
  { versionKey: false, timestamps: false }
);

const Sponsor = model("sponsor", sponsorSchema);

module.exports = { Sponsor };
