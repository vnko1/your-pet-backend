const {
	registerSchemaValidation,
	loginSchemaValidation,
	editUserValidation,
} = require("./users/usersSchemaValidation");

const {
	addSchema,
	updateFavorite,
} = require("./notices/noticesSchemaValidation");

const { addPetSchemaValidation } = require("./pets/petsSchemaValidation");

module.exports = {
	registerSchemaValidation,
	loginSchemaValidation,
	editUserValidation,
	addPetSchemaValidation,
	addSchema,
	updateFavorite,
	addPetSchemaValidation,
};
