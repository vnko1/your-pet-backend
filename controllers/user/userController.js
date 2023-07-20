const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const { Users, Image } = require("../../services");
const { tryCatchWrapper, httpError } = require("../../utils");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findUserByQuery({ email });

  if (user) throw httpError(409, "Email in use");

  const hashPass = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: "7d" });

  const newUser = await Users.createUser({ email, password: hashPass, token });

  res.json({ token, user: { id: newUser.id, email: newUser.email } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findUserByQuery({ email });
  if (!user) throw httpError(401, "Email or password is wrong");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw httpError(401, "Email or password is wrong");

  const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });

  await Users.updateUser(user.id, { token });

  res.json({ token, user: { id: user.id, email: user.email } });
};

const current = async (req, res) => {
  const { email, id } = req.user;

  res.json({ user: { id, email } });
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
    const avatarUrl = await Image.uploadImage(req.file.path, 182, 182);
    body.avatarUrl = avatarUrl;
    await fs.unlink(req.file.path);
  }

  const updatedUser = await Users.updateUser(id, body);

  res.json({ user: updatedUser });
};

module.exports = {
  register: tryCatchWrapper(register),
  login: tryCatchWrapper(login),
  current: tryCatchWrapper(current),
  logout: tryCatchWrapper(logout),
  update: tryCatchWrapper(update),
};
