const { isValidObjectId } = require("mongoose");
const { httpError } = require("../utils");
const { errorMessage } = require("../constants");

const isValidId = (req, _, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) next(httpError(400, errorMessage[400]));

  next();
};

module.exports = { isValidId };
