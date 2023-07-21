const jwt = require("jsonwebtoken");
const { tryCatchWrapper, httpError } = require("../utils");
const { Users } = require("../services");
const { errorMessage } = require("../constants");

const authentificate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" && !token)
    return next(httpError(401, errorMessage[401].wrongAuth));

  try {
    const userToken = jwt.verify(token, process.env.JWT_KEY);

    let user = null;
    if (userToken.id) user = await Users.findUserById(userToken.id);
    if (userToken.email)
      user = await Users.findUserByQuery({ email: userToken.email });

    if (!user || !user.token || user.token !== token)
      return next(httpError(401, errorMessage[401].wrongAuth));

    req.user = user;

    next();
  } catch {
    next(httpError(401, errorMessage[401].wrongAuth));
  }
};

module.exports = { authentificate: tryCatchWrapper(authentificate) };
