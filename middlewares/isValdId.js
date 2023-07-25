const { isValidObjectId } = require("mongoose");
const { httpError } = require("../utils");
const { errorMessage } = require("../constants");

const isValidId = (req, _, next) => {
  const key = Object.keys(req.params);

  if (!isValidObjectId(req.params[key]))
    next(httpError(400, errorMessage[400]));

  next();
};

module.exports = { isValidId };
