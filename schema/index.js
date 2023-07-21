const {
	registerSchemaValidation,
	loginSchemaValidation,
	editUserValidation,
} = require("./users/usersSchemaValidation");

const {
	addSchema,
	updateFavorite,
} = require("./notices/noticesSchemaValidation");

module.exports = {
	registerSchemaValidation,
	loginSchemaValidation,
	editUserValidation,
	addSchema,
	updateFavorite,
};
