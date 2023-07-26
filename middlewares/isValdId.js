const { isValidObjectId } = require("mongoose");
const { httpError } = require("../utils");

const isValidId = (code, message) => (req, _, next) => {
  const key = Object.keys(req.params);

  if (!isValidObjectId(req.params[key])) next(httpError(code, message));

  next();
};

module.exports = { isValidId };
