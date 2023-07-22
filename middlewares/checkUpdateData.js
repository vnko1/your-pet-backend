const fs = require("fs/promises");
const jwt = require("jsonwebtoken");

const { Users, Image } = require("../services");
const { httpError, createToken } = require("../utils");
const { file, errorMessage, expiresIn } = require("../constants");

const checkUpdateData = async (req, res, next) => {
  const { body } = req;

  if (req.file) {
    const avatarUrl = await Image.uploadImage(
      req.file.path,
      file.avatar.width,
      file.avatar.height,
      req.file.fieldname
    );

    body.avatarUrl = avatarUrl;
    await fs.unlink(req.file.path);
  }

  if (body.email) {
    const user = await Users.findUserByQuery({ email: body.email });

    if (user) next(httpError(409, errorMessage[409]));

    body.token = createToken({ email: body.email });
  }

  next();
};

module.exports = { checkUpdateData };
