const { httpError } = require("../utils");

const checkFileFieldName = (name) => (req, res, next) => {
  console.log(req.file);
  next();
  //   if (!req.file) next();
  //   if (name !== req.file.fieldname) next(httpError(400, "Bad request"));
};

module.exports = { checkFileFieldName };
