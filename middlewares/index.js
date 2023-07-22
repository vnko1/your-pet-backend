const { fieldValidation, checkFile } = require("./fieldValidation");
const { authentificate } = require("./authentification");
const { checkUpdateData } = require("./checkUpdateData");
const { isValidId } = require("./isValidId");

module.exports = {
	fieldValidation,
	checkFile,
	authentificate,
	checkUpdateData,
	isValidId
};
