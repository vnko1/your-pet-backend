const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Users } = require("../../services");
const {
  tryCatchWrapper,
  httpError,
  createToken,
  hashPassword,
} = require("../../utils");
const { errorMessage } = require("../../constants");

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const user = await Users.findUserByQuery({ email });
  if (user) throw httpError(409, errorMessage[409]);

  const hashPass = await hashPassword(password);
  const token = createToken({ email });

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

  const token = createToken({ id: user.id });

  const updatedUser = await Users.updateUser(user.id, { token });
  updatedUser.password = undefined;
  updatedUser.token = undefined;

  res.json({
    token,
    user: { ...updatedUser["_doc"], isNewUser: false },
  });
};

const current = async (req, res) => {
  req.user.password = undefined;
  req.user.token = undefined;

  res.json({ user: { ...req.user["_doc"], isNewUser: false } });
};

const logout = async (req, res) => {
  const { id } = req.user;

  await Users.updateUser(id, { token: "" });

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.user;
  const { body } = req;

  const updatedUser = await Users.updateUser(id, body);
  const token = updatedUser.token;
  updatedUser.password = undefined;
  updatedUser.token = undefined;

  res.json({
    token: body.token ? body.token : token,
    user: { ...updatedUser["_doc"], isNewUser: false },
  });
};

module.exports = {
  register: tryCatchWrapper(register),
  login: tryCatchWrapper(login),
  current: tryCatchWrapper(current),
  logout: tryCatchWrapper(logout),
  update: tryCatchWrapper(update),
};
