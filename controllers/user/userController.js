const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Users, Image } = require("../../services");
const { tryCatchWrapper, httpError } = require("../../utils");
const { file, errorMessage, expiresIn } = require("../../constants");

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const user = await Users.findUserByQuery({ email });

  if (user) throw httpError(409, errorMessage[409]);

  const hashPass = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, process.env.JWT_KEY, {
    expiresIn: expiresIn,
  });

  const newUser = await Users.createUser({
    email,
    password: hashPass,
    token,
    name,
  });

  res.json({
    token,
    user: {
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isNewUser: true,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findUserByQuery({ email });
  if (!user) throw httpError(401, errorMessage[401].wrongLogin);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw httpError(401, errorMessage[401].wrongLogin);

  const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
    expiresIn: expiresIn,
  });

  const updatedUser = await Users.updateUser(user.id, { token });
  updatedUser.password = undefined;
  updatedUser.token = undefined;
  updatedUser.isNewUser = false;

  res.json({
    token,
    user: updatedUser,
  });
};

const current = async (req, res) => {
  req.user.password = undefined;
  req.user.token = undefined;
  req.user.isNewUser = false;

  res.json({ user: req.user });
};

const logout = async (req, res) => {
  const { id } = req.user;

  await Users.updateUser(id, { token: "" });

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.user;
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

  const updatedUser = await Users.updateUser(id, body);
  updatedUser.password = undefined;
  updatedUser.token = undefined;
  updatedUser.isNewUser = false;

  res.json({ user: updatedUser });
};

module.exports = {
  register: tryCatchWrapper(register),
  login: tryCatchWrapper(login),
  current: tryCatchWrapper(current),
  logout: tryCatchWrapper(logout),
  update: tryCatchWrapper(update),
};
