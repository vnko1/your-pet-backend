const jwt = require("jsonwebtoken");
const { tryCatchWrapper, httpError } = require("../utils");
const { Users } = require("../services");

const { JWT_KEY } = process.env;

const authentificate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" && !token)
    return next(httpError(401, "Not authorized"));

  try {
    const { id } = jwt.verify(token, JWT_KEY);
    const user = Users;

    if (!user || !user.token || user.token !== token)
      return next(httpError(401, "Not authorized"));

    req.user = user;

    next();
  } catch {
    next(httpError(401, "Not authorized"));
  }
};

module.exports = { authentificate: tryCatchWrapper(authentificate) };
