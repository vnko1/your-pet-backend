const bcrypt = require("bcrypt");

const { Users } = require("../../services");
const {
  tryCatchWrapper,
  httpError,
  createToken,
  hashPassword,
} = require("../../utils");
const { errorMessage } = require("../../constants");

const googleAuth = (req, res) => {
  const url = `${process.env.FRONTEND_URL}?token=${req.user.token}`;

  res.redirect(url);
};

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const user = await Users.findUserByQuery({ email });
  if (user) throw httpError(409, errorMessage[409]);

  const hashPass = await hashPassword(password);
  const [token, tokenLifeTime] = createToken(
    { email },
    process.env.JWT_KEY,
    process.env.TOKEN_LIFE
  );
  const [refreshToken] = createToken(
    { email },
    process.env.REFRESH_JWT_KEY,
    process.env.REFRESH_TOKEN_LIFE
  );

  const newUser = await Users.createUser({
    email,
    password: hashPass,
    token,
    tokenLifeTime,
    name,
    refreshToken,
  });

  res.json({
    token,
    tokenLifeTime,
    refreshToken,
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

  const [token, tokenLifeTime] = createToken(
    { id: user.id },
    process.env.JWT_KEY,
    process.env.TOKEN_LIFE
  );
  const [refreshToken] = createToken(
    { id: user.id },
    process.env.REFRESH_JWT_KEY,
    process.env.REFRESH_TOKEN_LIFE
  );

  const updatedUser = await Users.updateUser({
    id: user.id,
    data: { token, tokenLifeTime, refreshToken },
    projection: "-password -avatarId",
  });

  res.json({
    token: updatedUser.token,
    tokenLifeTime: updatedUser.tokenLifeTime,
    refreshToken: updatedUser.refreshToken,
    user: {
      uid: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      birthday: updatedUser.birthday,
      phone: updatedUser.phone,
      city: updatedUser.city,
      favorites: updatedUser.favorites,
      pets: updatedUser.pets,
      avatarUrl: updatedUser.avatarUrl,
      isNewUser: false,
    },
  });
};

const refresh = async (req, res) => {
  const [token, tokenLifeTime] = createToken(
    { id: req.user.id },
    process.env.JWT_KEY,
    process.env.TOKEN_LIFE
  );
  const [refreshToken] = createToken(
    { id: req.user.id },
    process.env.REFRESH_JWT_KEY,
    process.env.REFRESH_TOKEN_LIFE
  );
  await Users.updateUser({
    id: req.user.id,
    data: { token, tokenLifeTime, refreshToken },
  });

  res.json({ token, tokenLifeTime, refreshToken });
};

const logout = async (req, res) => {
  const { id } = req.user;

  await Users.updateUser({
    id,
    data: { token: "", refreshToken: "", tokenLifeTime: null },
  });

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.user;
  const { body } = req;

  const updatedUser = await Users.updateUser({
    id,
    data: body,
    projection: "-password -avatarId",
  });

  res.json({
    token: body.token ? body.token : updatedUser.token,
    tokenLifeTime: body.tokenLifeTime
      ? body.tokenLifeTime
      : updatedUser.tokenLifeTime,
    refreshToken: body.refreshToken
      ? body.refreshToken
      : updatedUser.refreshToken,
    user: {
      uid: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      birthday: updatedUser.birthday,
      phone: updatedUser.phone,
      city: updatedUser.city,
      favorites: updatedUser.favorites,
      pets: updatedUser.pets,
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
      pets: user.pets,
      favorites: user.favorites,
      avatarUrl: user.avatarUrl,
      isNewUser: false,
    },
  });
};

module.exports = {
  googleAuth: tryCatchWrapper(googleAuth),
  register: tryCatchWrapper(register),
  login: tryCatchWrapper(login),
  refresh: tryCatchWrapper(refresh),
  logout: tryCatchWrapper(logout),
  update: tryCatchWrapper(update),
  getMe: tryCatchWrapper(getMe),
};
