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

class Image {
  static upload(name) {
    const dirName = path.join(__dirname, "..", "..", "temp");

    const multerConfig = multer.diskStorage({
      destination: dirName,
      filename: (req, file, cb) => {
        const { id } = req.user;
        const { mimetype } = file;

        const ext = mimetype.split("/")[1];

        const filename = `${name}_` + id + "." + ext;

        cb(null, filename);
      },
    });

    const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) cb(null, true);
      else cb(httpError(400, "Bad request"), false);
    };

    return multer({ storage: multerConfig, fileFilter: multerFilter }).single(
      name
    );
  }

  static async uploadImage(imagePath, width, height) {
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
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
