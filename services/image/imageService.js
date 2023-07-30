const fs = require("fs/promises");
const Jimp = require("jimp");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const { httpError } = require("../../utils");
const { errorMessage, fileFormats, file } = require("../../constants");
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
      else cb(httpError(400, errorMessage[400]), false);
    };

    const multerLimits = { fileSize: file.avatar.fileSize };

    return multer({
      storage: multerConfig,
      fileFilter: multerFilter,
      limits: multerLimits,
    }).single(fieldName);
  }

  static uploadErrorHandler(fieldName, name) {
    const uploadFile = Image.upload(fieldName, name);

    return function (req, res, next) {
      uploadFile(req, res, function (err) {
        if (err instanceof multer.MulterError || err) {
          next(httpError(400, errorMessage[400]));
        }

        next();
      });
    };
  }

  static async uploadImage({
    imagePath,
    dirName,
    unique_filename = true,
    overwrite = false,
    width,
    height,
  }) {
    const options = {
      folder: dirName,
      allowed_formats: fileFormats,
      use_filename: true,
      unique_filename,
      overwrite,
    };

    try {
      if (width && height) {
        const image = await Jimp.read(imagePath);
        image.resize(width, height).write(imagePath);
      }
      const response = await cloudinary.uploader.upload(imagePath, options);

      await fs.unlink(imagePath);

      return response;
    } catch (error) {
      await fs.unlink(imagePath);

      throw httpError(500, error.message);
    }
  }

  static async deleteImage(id) {
    return await cloudinary.uploader.destroy(id, "image");
  }
}

module.exports = { Image };
