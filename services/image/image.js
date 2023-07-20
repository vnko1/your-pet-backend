const Jimp = require("jimp");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const { httpError } = require("../../utils");
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});
