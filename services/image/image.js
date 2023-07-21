const Jimp = require("jimp");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const { httpError } = require("../../utils");
// const { errorMessage, fileFormats, file } = require("../../constants");
const { nanoid } = require("nanoid");
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

class Image {
  static upload(fieldName, name) {
    const dirName = path.join(__dirname, "..", "..", "temp");

    const multerConfig = multer.diskStorage({
      destination: dirName,
      filename: (req, file, cb) => {
        const { mimetype } = file;

        const ext = mimetype.split("/")[1];
        const id = nanoid();
        const filename = `${name}_` + id + "." + ext;

        cb(null, filename);
      },
    });

    const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) cb(null, true);
      else cb(httpError(400, "errorMessage[400]"), false);
    };

    // const multerLimits = { fileSize: file.avatar.fileSize };

    return multer({
      storage: multerConfig,
      fileFilter: multerFilter,
      // limits: multerLimits,
    }).single(fieldName);
  }

  static uploadErrorHandler(fieldName, name) {
    const uploadFile = Image.upload(fieldName, name);

    return function (req, res, next) {
      uploadFile(req, res, function (err) {
        if (err instanceof multer.MulterError || err) {
          next(httpError(400, "errorMessage[400]"));
        }

        next();
      });
    };
  }

  static async uploadImage(imagePath, width, height, dirName) {
    const options = {
      folder: dirName,
      allowed_formats: fileFormats,
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    try {
      const image = await Jimp.read(imagePath);
      image.resize(width, height).write(imagePath);

      const result = await cloudinary.uploader.upload(imagePath, options);

      return result.secure_url;
    } catch (error) {
      throw httpError(500, error.message);
    }
  }
}

module.exports = { Image };
