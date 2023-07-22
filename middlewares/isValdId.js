const { isValidObjectId } = require("mongoose");
const { httpError } = require("../utils");
const { errorMessage } = require("../constants");

const isValidId = (req, _, next) => {
  const { petId } = req.params;
  if (!isValidObjectId(petId)) next(httpError(400, errorMessage[400]));

  next();
};

module.exports = { isValidId };
