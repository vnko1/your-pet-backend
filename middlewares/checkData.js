const fs = require("fs/promises");

const { Users, Image, Pets } = require("../services");
const { httpError, createToken } = require("../utils");
const { file, errorMessage } = require("../constants");

const checkUserData = async (req, res, next) => {
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

  const keys = Object.keys(body);
  if (!keys.length && !req.file) next(httpError(400, errorMessage[400]));

  next();
};

const checkPetData = async (req, res, next) => {
  const { body } = req;

  if (!req.file) return next(httpError(400, errorMessage[400]));

  const fileUrl = await Image.uploadImage(
    req.file.path,
    file.pet.width,
    file.pet.height,
    req.file.fieldname
  );

  body.fileUrl = fileUrl;

  await fs.unlink(req.file.path);

  next();
};

const checkUserAuth = async (req, res, next) => {
  const { petId } = req.params;
  const { id } = req.user;

  const pet = await Pets.find(petId);

  if (!pet) return next(httpError(404, errorMessage[404]));

  if (pet.owner.toString() !== id)
    next(httpError(401, errorMessage[401].wrongAuth));

  next();
};

module.exports = { checkUserData, checkPetData, checkUserAuth };
