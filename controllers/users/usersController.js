const bcrypt = require("bcrypt");
const { userFieldType } = require("../../constants");

const { Users } = require("../../services");
const {
  tryCatchWrapper,
  httpError,
  createToken,
  hashPassword,
} = require("../../utils");
const { errorMessage, defaultAvatarUrl } = require("../../constants");

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const user = await Users.findUserByQuery({ email });
  if (user) throw httpError(409, errorMessage[409]);

  const hashPass = await hashPassword(password);
  const token = createToken({ email });
  const avatarUrl = defaultAvatarUrl;

  const newUser = await Users.createUser({
    email,
    password: hashPass,
    token,
    name,
    avatarUrl,
  });

  res.json({
    token,
    user: {
      uid: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatarUrl: newUser.avatarUrl,
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

  const updatedUser = await Users.updateUser(
    user.id,
    { token },
    userFieldType.user,
    "-password -avatarId -pets"
  );

  res.json({
    token: updatedUser.token,
    user: {
      uid: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      birthday: updatedUser.birthday,
      phone: updatedUser.phone,
      city: updatedUser.city,
      avatarUrl: updatedUser.avatarUrl,
      isNewUser: false,
    },
  });
};

const current = async (req, res) => {
  res.json({
    user: {
      uid: req.user.id,
      email: req.user.email,
      name: req.user.name,
      birthday: req.user.birthday,
      phone: req.user.phone,
      city: req.user.city,
      avatarUrl: req.user.avatarUrl,
      isNewUser: false,
    },
  });
};

const logout = async (req, res) => {
  const { id } = req.user;

  await Users.updateUser(id, { token: "" }, userFieldType.user);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.user;
  const { body } = req;

  const updatedUser = await Users.updateUser(
    id,
    body,
    userFieldType.user,
    "-password -avatarId -pets"
  );

  res.json({
    token: body.token ? body.token : updatedUser.token,
    user: {
      uid: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      birthday: updatedUser.birthday,
      phone: updatedUser.phone,
      city: updatedUser.city,
      avatarUrl: updatedUser.avatarUrl,
      isNewUser: false,
    },
  });
};

const getMe = async (req, res) => {
  const { id } = req.user;

  const user = await Users.findUserById(
    id,
    "-password -token -avatarId"
  ).populate("pets");

  res.json({
    user: {
      uid: user.id,
      email: user.email,
      name: user.name,
      birthday: user.birthday,
      phone: user.phone,
      city: user.city,
      avatarUrl: user.avatarUrl,
      isNewUser: false,
      pets: user.pets,
    },
  });
};

module.exports = {
  register: tryCatchWrapper(register),
  login: tryCatchWrapper(login),
  current: tryCatchWrapper(current),
  logout: tryCatchWrapper(logout),
  update: tryCatchWrapper(update),
  getMe: tryCatchWrapper(getMe),
};
