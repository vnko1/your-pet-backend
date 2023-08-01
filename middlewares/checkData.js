const fs = require("fs/promises");

const { Users, Image, Pets } = require("../services");
const { httpError, createToken } = require("../utils");
const { errorMessage, defaultAvatarUrl, file } = require("../constants");

const checkUserData = async (req, res, next) => {
  const { email } = req.body;
  const { id } = req.user;

  if (req.file) {
    const { public_id, secure_url } = await Image.uploadImage({
      imagePath: req.file.path,
      dirName: req.file.fieldname,
    });

    req.body.avatarUrl = secure_url;
    req.body.avatarId = public_id;

    if (req.user.avatarId) await Image.deleteImage(req.user.avatarId);
  }

  if (email) {
    const user = await Users.findUserByQuery({ email, $nor: [{ _id: id }] });

    if (user) return next(httpError(409, errorMessage[409]));
    const [token, tokenLifeTime] = createToken(
      { email },
      process.env.JWT_KEY,
      process.env.TOKEN_LIFE
    );
    req.body.token = token;
    req.body.tokenLifeTime = tokenLifeTime;

    const [refreshToken] = createToken(
      { email },
      process.env.REFRESH_JWT_KEY,
      process.env.REFRESH_TOKEN_LIFE
    );
    req.body.refreshToken = refreshToken;
  }

  const keys = Object.keys(req.body);

  if (keys.includes(file.avatar.fieldName)) {
    const user = await Users.updateUser({
      id: req.user.id,
      data: { avatarId: "", avatarUrl: defaultAvatarUrl },
      newDoc: false,
    });

    if (user.avatarId) await Image.deleteImage(user.avatarId);
  }

  if (!keys.length && !req.file) next(httpError(400, errorMessage[400]));

  next();
};

const checkFieldData = async (req, res, next) => {
  const { body } = req;

  if (!req.file) return next(httpError(400, errorMessage[400]));

  const { public_id, secure_url } = await Image.uploadImage({
    imagePath: req.file.path,
    dirName: req.file.fieldname,
  });

  body.fileUrl = secure_url;
  body.fileId = public_id;

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

module.exports = { checkUserData, checkFieldData, checkUserAuth };
