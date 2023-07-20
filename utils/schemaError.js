const schemaError = (error, doc, next) => {
  error.status = 400;
  next();
};

module.exports = { schemaError };
