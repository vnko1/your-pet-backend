const crypto = require("crypto");

const hashEmail = (email) =>
  crypto.createHash("md5").update(email).digest("hex");

module.exports = { hashEmail };
