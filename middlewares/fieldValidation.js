const { httpError } = require("../utils");
const { errorMessage } = require("../constants");

const fieldValidation = (schema, message) => (req, _, next) => {
  const { body } = req;

  const { error, value } = schema.validate(body);

  if (error && !message) return next(httpError(400, error.message));

  if (error) return next(httpError(400, message));

  req.body = value;
  next();
};

const checkFile = (req, res, next) => {
  if (!req.file) next(httpError(400, errorMessage[400]));
  next();
};

module.exports = { fieldValidation, checkFile };
