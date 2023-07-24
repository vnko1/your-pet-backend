const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    imageUrl: String,
    title: String,
    text: String,
    date: Date,
    url: String,
  },
  { versionKey: false, timestamps: false }
);

const Article = model("article", articleSchema);

module.exports = { Article };
