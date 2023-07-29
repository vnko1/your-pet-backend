const jwt = require("jsonwebtoken");
const { Users } = require("../services");
const { httpError } = require("../utils");
const { errorMessage } = require("../constants");

const authentificate = (security) => async (req, _, next) => {
  let securityToken = null;
  let securityKey = null;
  if (security === "token") {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" && !token)
      return next(httpError(401, errorMessage[401].wrongAuth));

    securityToken = token;
    securityKey = process.env.JWT_KEY;
  }

  if (security === "refreshToken") {
    const { refreshToken } = req.body;

    if (!refreshToken) return next(httpError(401, errorMessage[401].wrongAuth));

    securityToken = refreshToken;
    securityKey = process.env.REFRESH_JWT_KEY;
  }
  try {
    const userToken = jwt.verify(securityToken, securityKey);

    let user = null;
    if (userToken.id) user = await Users.findUserById(userToken.id);
    if (userToken.email)
      user = await Users.findUserByQuery({ email: userToken.email });

    if (!user || !user[security] || user[security] !== securityToken)
      return next(httpError(401, errorMessage[401].wrongAuth));

    req.user = user;

    next();
  } catch {
    next(httpError(401, errorMessage[401].wrongAuth));
  }
};

module.exports = {
  authentificate,
};
