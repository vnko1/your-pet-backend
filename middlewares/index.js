const { fieldValidation, checkFile } = require("./fieldValidation");
const { authentificate } = require("./authentification");
const { checkUserData, checkFieldData, checkUserAuth } = require("./checkData");
const { isValidId } = require("./isValdId");

module.exports = {
  fieldValidation,
  checkFile,
  authentificate,
  checkUserData,
  checkUserAuth,
  isValidId,
  checkFieldData,
};
